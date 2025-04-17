"use client";

import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Cloud,
  CreditCard,
  GripVertical,
  Pencil,
  Save,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { NewsletterComponent } from "@/components/newsletter/newsletter-creator";

interface NewsletterComponentCardProps {
  component: NewsletterComponent;
  onRemove: (id: string) => void;
  onUpdate: (id: string, params: { city?: string; currency?: string }) => void;
  initialEditMode?: boolean;
}

export function NewsletterComponentCard({
  component,
  onRemove,
  onUpdate,
  initialEditMode = false,
}: NewsletterComponentCardProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [city, setCity] = useState(component.params.city || "");
  const [currency, setCurrency] = useState(component.params.currency || "");

  // Set editing mode when component is initially rendered with initialEditMode=true
  useEffect(() => {
    if (initialEditMode) {
      setIsEditing(true);
    }
  }, [initialEditMode]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (component.type === "weather") {
      onUpdate(component.id, { city });
    } else if (component.type === "crypto") {
      onUpdate(component.id, { currency });
    }
    setIsEditing(false);
  };

  return (
    <Card ref={setNodeRef} style={style} className='relative gap-2 pl-1'>
      <div
        className='absolute -mt-6 flex h-full cursor-move touch-none items-center'
        {...attributes}
        {...listeners}
      >
        <GripVertical className='text-muted-foreground h-5 w-5' />
      </div>

      <CardHeader className='flex flex-row items-center justify-between pb-2 pl-8'>
        <div className='flex items-center'>
          {component.type === "weather" ? (
            <Cloud className='mr-2 h-5 w-5 text-blue-500' />
          ) : (
            <CreditCard className='mr-2 h-5 w-5 text-green-500' />
          )}
          <span className='font-medium'>
            {component.type === "weather" ? "Weather" : "Cryptocurrency"}
          </span>
        </div>
        <div className='flex space-x-1'>
          {!isEditing && (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsEditing(true)}
            >
              <Pencil className='h-4 w-4' />
            </Button>
          )}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onRemove(component.id)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='pl-8'>
        {isEditing ? (
          <div className='space-y-4'>
            {component.type === "weather" && (
              <div className='space-y-2'>
                <Label htmlFor={`city-${component.id}`}>City</Label>
                <Input
                  id={`city-${component.id}`}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            )}

            {component.type === "crypto" && (
              <div className='space-y-2'>
                <Label htmlFor={`currency-${component.id}`}>
                  Cryptocurrency
                </Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id={`currency-${component.id}`}>
                    <SelectValue placeholder='Select a cryptocurrency' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Bitcoin'>Bitcoin (BTC)</SelectItem>
                    <SelectItem value='Ethereum'>Ethereum (ETH)</SelectItem>
                    <SelectItem value='Monero'>Monero (XMR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        ) : (
          <div className='py-2'>
            {component.type === "weather" && (
              <p>
                Weather forecast for{" "}
                <span className='font-medium'>{component.params.city}</span>
              </p>
            )}

            {component.type === "crypto" && (
              <p>
                Price of{" "}
                <span className='font-medium'>{component.params.currency}</span>
              </p>
            )}
          </div>
        )}
      </CardContent>

      {isEditing && (
        <CardFooter className='flex justify-end space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              if (component.isNew) {
                // If it's a new component and user cancels, remove it
                onRemove(component.id);
              } else {
                // Otherwise just exit edit mode
                setIsEditing(false);
              }
            }}
          >
            Cancel
          </Button>
          <Button size='sm' onClick={handleSave}>
            <Save className='mr-2 h-4 w-4' />
            Save
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
