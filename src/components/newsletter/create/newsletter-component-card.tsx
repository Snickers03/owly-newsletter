"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { cryptosPreviewData } from "@/utils/crypto.data";
import { quotesPreviewData } from "@/utils/quotes.data";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  Cloud,
  CreditCard,
  GripVertical,
  Pencil,
  Quote,
  RefreshCw,
  Save,
  Trash,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { NewsletterComponent } from "@/components/newsletter/create/newsletter-creator";

interface NewsletterComponentCardProps {
  component: NewsletterComponent;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    params: {
      city?: string;
      currency?: string;
      currencies?: string[];
      quote?: string;
      author?: string;
      quoteId?: number;
    },
  ) => void;
  initialEditMode?: boolean;
}

const cryptocurrencies = cryptosPreviewData.map((crypto) => ({
  label: crypto.name,
  value: crypto.symbol,
}));

export function NewsletterComponentCard({
  component,
  onRemove,
  onUpdate,
  initialEditMode = false,
}: NewsletterComponentCardProps) {
  const [isEditing, setIsEditing] = useState(initialEditMode);
  const [city, setCity] = useState(component.params.city || "");
  const [currencies, setCurrencies] = useState<string[]>(
    component.params.currencies || [],
  );
  const [quoteId, setQuoteId] = useState<number>(
    component.params.quoteId !== undefined
      ? component.params.quoteId
      : Math.floor(Math.random() * quotesPreviewData.length),
  );
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  // Create separate refs for different element types
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (initialEditMode) {
      setIsEditing(true);
    }
  }, [initialEditMode]);

  useEffect(() => {
    if (isEditing) {
      // Focus the appropriate element based on component type
      if (component.type === "weather" && inputRef.current) {
        inputRef.current.focus();
      } else if (component.type === "crypto" && selectRef.current) {
        selectRef.current.focus();
      }
    }
  }, [isEditing, component.type]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const validateInput = () => {
    if (component.type === "weather" && !city.trim()) {
      setError("Please enter a city name");
      return false;
    }

    if (component.type === "crypto" && currencies.length === 0) {
      setError("Please select at least one cryptocurrency");
      return false;
    }

    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateInput()) {
      return;
    }

    if (component.type === "weather") {
      onUpdate(component.id, { city });
    } else if (component.type === "crypto") {
      onUpdate(component.id, { currencies });
    } else if (component.type === "quote") {
      const selectedQuote = quotesPreviewData[quoteId];
      onUpdate(component.id, {
        quote: selectedQuote.quote,
        author: selectedQuote.author,
        quoteId,
      });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (component.isNew) {
        onRemove(component.id);
      } else {
        setIsEditing(false);
      }
    }
  };

  const toggleCurrency = (value: string) => {
    setCurrencies((current) =>
      current.includes(value)
        ? current.filter((c) => c !== value)
        : [...current, value],
    );
    if (error) setError("");
  };

  const getNewRandomQuote = () => {
    let newQuoteId;
    do {
      newQuoteId = Math.floor(Math.random() * quotesPreviewData.length);
    } while (newQuoteId === quoteId && quotesPreviewData.length > 1);

    setQuoteId(newQuoteId);
  };

  const currentQuote = quotesPreviewData[quoteId];

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
          ) : component.type === "crypto" ? (
            <CreditCard className='mr-2 h-5 w-5 text-green-500' />
          ) : (
            <Quote className='mr-2 h-5 w-5 text-purple-500' />
          )}
          <span className='font-medium'>
            {component.type === "weather"
              ? "Weather"
              : component.type === "crypto"
                ? "Cryptocurrency"
                : "Quote"}
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
                  ref={inputRef}
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  className={error ? "border-red-500" : ""}
                />
                {error && <p className='text-xs text-red-500'>{error}</p>}
              </div>
            )}

            {component.type === "crypto" && (
              <div className='space-y-2'>
                <Label htmlFor={`currency-${component.id}`}>
                  Cryptocurrencies
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      ref={selectRef}
                      variant='outline'
                      role='combobox'
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between",
                        currencies.length > 0 ? "h-auto min-h-10 py-2" : "",
                        error ? "border-red-500" : "",
                      )}
                      onClick={() => setOpen(!open)}
                      onKeyDown={handleKeyDown}
                    >
                      {currencies.length > 0 ? (
                        <div className='flex flex-wrap gap-1'>
                          {currencies.map((currency) => (
                            <Badge
                              key={currency}
                              variant='secondary'
                              className='mr-1 mb-1'
                            >
                              {currency}
                              <span
                                className='ring-offset-background focus:ring-ring ml-1 cursor-pointer rounded-full outline-none focus:ring-2 focus:ring-offset-2'
                                role='button'
                                tabIndex={0}
                                aria-label={`Remove ${currency}`}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.stopPropagation();
                                    toggleCurrency(currency);
                                  }
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleCurrency(currency);
                                }}
                              >
                                <X className='h-3 w-3' />
                              </span>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        "Select cryptocurrencies"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0'>
                    <Command>
                      <CommandInput placeholder='Search cryptocurrency...' />
                      <CommandList>
                        <CommandEmpty>No cryptocurrency found.</CommandEmpty>
                        <CommandGroup>
                          {cryptocurrencies.map((crypto) => (
                            <CommandItem
                              key={crypto.value}
                              value={crypto.value}
                              onSelect={() => {
                                toggleCurrency(crypto.value);
                                setOpen(true); // Keep open after selection
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currencies.includes(crypto.value)
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {crypto.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {error && <p className='text-xs text-red-500'>{error}</p>}
              </div>
            )}

            {component.type === "quote" && (
              <div className='space-y-4'>
                <div className='rounded-lg border p-4'>
                  <blockquote className='text-muted-foreground italic'>
                    "{currentQuote.quote}"
                    <br />
                    <span className='text-foreground mt-2 block text-right text-sm'>
                      – {currentQuote.author}
                    </span>
                  </blockquote>
                </div>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  onClick={getNewRandomQuote}
                >
                  <RefreshCw className='mr-2 h-4 w-4' />
                  Get Another Quote
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className='py-2'>
            {component.type === "weather" && component.params.city && (
              <p>
                Weather forecast for{" "}
                <span className='font-medium'>{component.params.city}</span>
              </p>
            )}

            {component.type === "crypto" && (
              <p>
                Price of{" "}
                <span className='font-medium'>
                  {component.params.currencies &&
                    component.params.currencies.join(", ")}
                </span>
              </p>
            )}

            {component.type === "quote" && (
              <blockquote className='text-muted-foreground italic'>
                "{component.params.quote || currentQuote.quote}"
                <br />
                <span className='text-foreground mt-2 block text-right text-sm'>
                  – {component.params.author || currentQuote.author}
                </span>
              </blockquote>
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
                onRemove(component.id);
              } else {
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
