"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { timeOptions } from "@/lib/newsletter.utils";
import { useUserStore } from "@/store/user-store";
import { IComponentType } from "@/types";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IntervalType } from "@prisma/client";
import { PlusCircle, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentSelector } from "@/components/newsletter/component-selector";
import { NewsletterComponentCard } from "@/components/newsletter/newsletter-component-card";
import { NewsletterPreview } from "@/components/newsletter/newsletter-preview";
import { trpc } from "@/app/_trpc/client";

export type NewsletterComponent = {
  id: string;
  type: IComponentType;
  params: {
    city?: string;
    currency?: string;
    quote?: string;
  };
  isNew?: boolean;
};

export function NewsletterCreator() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  // Form 1: Base Configuration
  const [title, setTitle] = useState("");
  const [interval, setInterval] = useState<string>("weekly");
  const [time, setTime] = useState("09:00");
  // Form 2: Components
  const [components, setComponents] = useState<NewsletterComponent[]>([]);

  const [showSelector, setShowSelector] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddComponentType = (type: IComponentType) => {
    const id = `component-${Date.now()}`;
    // Add a new empty component that will be in edit mode
    setComponents([
      ...components,
      {
        id,
        type,
        params: {},
        isNew: true, // Flag to indicate this is a new component that should be in edit mode
      },
    ]);
    setShowSelector(false);
  };

  const handleRemoveComponent = (id: string) => {
    setComponents(components.filter((component) => component.id !== id));
  };

  const handleUpdateComponent = (
    id: string,
    params: { city?: string; currency?: string },
  ) => {
    setComponents(
      components.map((component) =>
        component.id === id
          ? {
              ...component,
              params: { ...component.params, ...params },
              isNew: false,
            }
          : component,
      ),
    );
  };

  const { mutate: createNewsletter } = trpc.newsletter.create.useMutation({
    onSuccess: () => {
      router.push("/main/newsletter");
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      console.error("Error creating newsletter:", error);
    },
  });

  const handleSave = () => {
    const newsletterData = {
      userId: user?.id ?? "",
      title,
      interval: interval as IntervalType,
      time,
      components: components.map((component) => ({
        type: component.type,
        params: component.params,
      })),
    };
    createNewsletter(newsletterData);
  };

  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
      {/* Left Column - Configuration */}
      <div className='space-y-6'>
        {/* Form 1: Base Configuration */}
        <Card>
          <CardContent>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Newsletter Title</Label>
                <Input
                  id='title'
                  placeholder='My Personal Newsletter'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Delivery Interval</Label>
                  <Tabs
                    value={interval}
                    onValueChange={setInterval}
                    className='w-full'
                  >
                    <TabsList className='grid w-full grid-cols-3'>
                      <TabsTrigger value='daily'>Daily</TabsTrigger>
                      <TabsTrigger value='weekly'>Weekly</TabsTrigger>
                      <TabsTrigger value='monthly'>Monthly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='time'>Delivery Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id='time'>
                      <SelectValue placeholder='Select a time' />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((timeOption) => (
                        <SelectItem key={timeOption} value={timeOption}>
                          {timeOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Form 2: Components */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Newsletter Components</h2>
            <Button
              variant='outline'
              onClick={() => setShowSelector(true)}
              disabled={showSelector}
            >
              <PlusCircle className='mr-2 h-4 w-4' />
              Add Component
            </Button>
          </div>

          {showSelector && (
            <ComponentSelector
              onSelectType={handleAddComponentType}
              onCancel={() => setShowSelector(false)}
            />
          )}

          <div className='bg-muted/30 min-h-[200px] rounded-lg border border-dashed p-4'>
            {components.length === 0 ? (
              <div className='text-muted-foreground flex h-[200px] flex-col items-center justify-center'>
                <p>No components added</p>
                <Button
                  variant='link'
                  onClick={() => setShowSelector(true)}
                  className='mt-2'
                >
                  Add Component
                </Button>
              </div>
            ) : (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={components.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className='space-y-4'>
                    {components.map((component) => (
                      <NewsletterComponentCard
                        key={component.id}
                        component={component}
                        onRemove={handleRemoveComponent}
                        onUpdate={handleUpdateComponent}
                        initialEditMode={!!component.isNew}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            onClick={handleSave}
            disabled={!title || components.length === 0}
          >
            <Save className='mr-2 h-4 w-4' />
            Save Newsletter
          </Button>
        </div>
      </div>

      {/* Right Column - Preview */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold'>Newsletter Preview</h2>
        <div className='sticky top-4'>
          <NewsletterPreview
            title={title || "My Newsletter"}
            components={components}
            interval={interval}
            time={time}
          />
        </div>
      </div>
    </div>
  );
}
