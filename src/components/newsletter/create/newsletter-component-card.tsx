"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn, cryptoSymbolsToNames, cryptoSymbolToName } from "@/lib/utils";
import { INewsletterComponent } from "@/types";
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

interface NewsletterComponentCardProps {
  component: INewsletterComponent;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    params: {
      city?: string;
      currencies?: string[];
      quote?: string;
      author?: string;
    },
  ) => void;
  initialEditMode?: boolean;
}

const cryptocurrencies = cryptosPreviewData.map(({ name, symbol }) => ({
  label: name,
  value: symbol,
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
    Math.floor(Math.random() * quotesPreviewData.length),
  );
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (initialEditMode) setIsEditing(true);
  }, [initialEditMode]);

  useEffect(() => {
    if (!isEditing) return;
    if (component.type === "weather") inputRef.current?.focus();
    else if (component.type === "crypto") selectRef.current?.focus();
  }, [isEditing, component.type]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: component.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const validateInput = () => {
    if (component.type === "weather" && !city.trim())
      return setError("Please enter a city name"), false;
    if (component.type === "crypto" && currencies.length === 0)
      return setError("Please select at least one cryptocurrency"), false;
    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateInput()) return;
    const updateParams =
      component.type === "weather"
        ? { city }
        : component.type === "crypto"
          ? { currencies }
          : (() => {
              const { quote, author } = quotesPreviewData[quoteId];
              return { quote, author };
            })();
    onUpdate(component.id, updateParams);
    setIsEditing(false);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
  ) => {
    if (e.key === "Enter") return e.preventDefault(), handleSave();
    if (e.key === "Escape")
      return (
        e.preventDefault(),
        component.isNew ? onRemove(component.id) : setIsEditing(false)
      );
  };

  const toggleCurrency = (value: string) => {
    setCurrencies((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
    if (error) setError("");
  };

  const getNewRandomQuote = () => {
    let newId;
    do newId = Math.floor(Math.random() * quotesPreviewData.length);
    while (newId === quoteId && quotesPreviewData.length > 1);
    setQuoteId(newId);
  };

  const currentQuote = quotesPreviewData[quoteId];
  const displayTitle =
    component.type === "weather"
      ? "Weather"
      : component.type === "crypto"
        ? "Cryptocurrency"
        : "Quote";
  const displayIcon =
    component.type === "weather" ? (
      <Cloud className='mr-2 h-5 w-5 text-blue-500' />
    ) : component.type === "crypto" ? (
      <CreditCard className='mr-2 h-5 w-5 text-green-500' />
    ) : (
      <Quote className='mr-2 h-5 w-5 text-purple-500' />
    );

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
          {displayIcon}
          <span className='font-medium'>{displayTitle}</span>
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
                              {cryptoSymbolToName(currency)}
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
                                setOpen(true);
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
                    &quot;{currentQuote.quote}&quot;
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
                    cryptoSymbolsToNames(component.params.currencies).join(
                      ", ",
                    )}
                </span>
              </p>
            )}
            {component.type === "quote" && (
              <blockquote className='text-muted-foreground italic'>
                &quot;{component.params.quote || currentQuote.quote}&quot;
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
            onClick={() =>
              component.isNew ? onRemove(component.id) : setIsEditing(false)
            }
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
