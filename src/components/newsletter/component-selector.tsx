"use client";

import { IComponentType } from "@/types";
import { Cloud, CreditCard, Quote, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ComponentSelectorProps {
  onSelectType: (type: IComponentType) => void;
  onCancel: () => void;
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
    title: "Cryptocurrency",
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
          {componentOptions.map((option) => (
            <div
              key={option.type}
              className='group cursor-pointer'
              onClick={() => onSelectType(option.type)}
            >
              <Card className='group-hover:border-primary border-1 transition-all group-hover:shadow-md'>
                <CardContent className='flex flex-col items-center text-center'>
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${option.bgColor}`}
                  >
                    {option.icon}
                  </div>
                  <h3 className='font-medium'>{option.title}</h3>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
