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

const componentOptions: {
  type: IComponentType;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}[] = [
  {
    type: "weather",
    title: "Weather",
    icon: <Cloud className='h-6 w-6 text-blue-500' />,
    bgColor: "bg-blue-100",
  },
  {
    type: "crypto",
    title: "Crypto",
    icon: <CreditCard className='h-6 w-6 text-green-500' />,
    bgColor: "bg-green-100",
  },
  {
    type: "quote",
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
    <Card className='gap-2 py-3'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>Select Component</CardTitle>
        <Button variant='ghost' size='icon' onClick={onCancel}>
          <X className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent className=''>
        <div className='grid grid-cols-3 gap-4'>
          {componentOptions.map(({ type, title, icon, bgColor }) => {
            const isDisabled = existingComponentTypes.includes(type);

            return (
              <div
                key={type}
                className={`group ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                onClick={() => !isDisabled && onSelectType(type)}
              >
                <Card
                  className={`border-1 transition-all ${!isDisabled ? "group-hover:border-primary group-hover:shadow-md" : ""}`}
                >
                  <CardContent className='flex flex-col items-center text-center'>
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}
                    >
                      {icon}
                    </div>
                    <h3 className='font-medium'>{title}</h3>
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
