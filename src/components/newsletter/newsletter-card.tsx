"use client";

import Link from "next/link";
import { APP_MAIN_PAGE } from "@/config";
import { formatDate, toNormalCase } from "@/lib/utils";
import type { Component, Newsletter } from "@prisma/client";
import {
  Calendar,
  Clock,
  MoreHorizontal,
  Newspaper,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  newsletter: Newsletter & { components: Component[] };
  deleteNewsletter: (id: string) => void;
  toggleActive: (id: string, currentStatus: boolean) => void;
}

export function NewsletterCard({
  newsletter,
  deleteNewsletter,
  toggleActive,
}: Props) {
  const componentCount = newsletter.components.length;

  return (
    <Card className='overflow-hidden pb-0 transition-shadow hover:shadow-md'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='truncate text-xl' title={newsletter.title}>
            {newsletter.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='-mr-2'>
                <MoreHorizontal className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <Link href={`${APP_MAIN_PAGE}/${newsletter.id}`}>
                <DropdownMenuItem>
                  <Newspaper className='mr-2 h-4 w-4' />
                  View
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => toggleActive(newsletter.id, newsletter.active)}
              >
                <Clock className='mr-2 h-4 w-4' />
                {newsletter.active ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-destructive'
                onClick={() => deleteNewsletter(newsletter.id)}
              >
                <Trash className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-muted-foreground mb-4 flex items-center text-sm'>
          <Clock className='mr-1 h-4 w-4' />
          <span>{newsletter.time}</span>
          <span className='mx-2'>•</span>
          <Calendar className='mr-1 h-4 w-4' />
          <span>{toNormalCase(newsletter.interval)}</span>
        </div>

        <div className='space-y-2'>
          <div className='flex flex-wrap gap-2'>
            {newsletter.active ? (
              <Badge className='bg-green-100 text-green-800 hover:bg-green-200'>
                Active
              </Badge>
            ) : (
              <Badge
                variant='secondary'
                className='bg-amber-100 text-amber-800 hover:bg-amber-200'
              >
                Inactive
              </Badge>
            )}
            {componentCount > 0 && (
              <Badge variant='secondary'>
                {componentCount}{" "}
                {componentCount === 1 ? "Component" : "Components"}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className='bg-muted/30 border-t px-6 py-3'>
        <div className='text-muted-foreground flex w-full items-center justify-between text-xs'>
          <span>Created {formatDate(newsletter.createdAt)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
