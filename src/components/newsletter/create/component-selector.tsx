"use client";

import { IComponentType } from "@/types";
import { Cloud, CreditCard, Quote, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ComponentSelectorProps {
  onSelectType: (type: IComponentType) => void;
  onCancel: () => void;
  existingComponentTypes: IComponentType[];
}

const componentOptions = [
  {
    type: "weather" as const,
    title: "Weather",
    icon: <Cloud className='h-6 w-6 text-blue-500' />,
    bgColor: "bg-blue-100",
  },
  {
    type: "crypto" as const,
    title: "Crypto",
    icon: <CreditCard className='h-6 w-6 text-green-500' />,
    bgColor: "bg-green-100",
  },
  {
    type: "quote" as const,
    title: "Quote",
    icon: <Quote className='h-6 w-6 text-yellow-500' />,
    bgColor: "bg-yellow-100",
  },
];

export function ComponentSelector({
  onSelectType,
  onCancel,
  existingComponentTypes,
}: ComponentSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>Select Component</CardTitle>
          <Button variant='ghost' size='icon' onClick={onCancel}>
            <X className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-4'>
          {componentOptions.map((option) => {
            const isDisabled = existingComponentTypes.includes(option.type);
            return (
              <div
                key={option.type}
                className={`group ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                onClick={() => !isDisabled && onSelectType(option.type)}
              >
                <Card
                  className={`border-1 transition-all ${!isDisabled ? "group-hover:border-primary group-hover:shadow-md" : ""}`}
                >
                  <CardContent className='flex flex-col items-center text-center'>
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${option.bgColor}`}
                    >
                      {option.icon}
                    </div>
                    <h3 className='font-medium'>{option.title}</h3>
                    {isDisabled ? (
                      <p className='text-muted-foreground mt-1 text-xs'>
                        Already added
                      </p>
                    ) : (
                      <p className='mt-1 text-xs text-white'>-</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
