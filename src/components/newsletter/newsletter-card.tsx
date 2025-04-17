"use client";

import Link from "next/link";
import { formatDate, toNormalCase } from "@/lib/utils";
import { Calendar, Clock, Edit, MoreHorizontal, Trash } from "lucide-react";

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

interface NewsletterCardProps {
  newsletter: {
    id: string;
    title: string;
    interval: string;
    time: string;
    components: Array<{
      type: string;
      params: {
        city?: string;
        currency?: string;
      };
    }>;
    createdAt: string;
    subscribers: number;
  };
}

export function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const handleDelete = () => {
    console.log("TODO: Delete newsletter");
  };

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
              <Link href={`/main/newsletter/edit?nid=${newsletter.id}`}>
                <DropdownMenuItem>
                  <Edit className='mr-2 h-4 w-4' />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-destructive'
                onClick={handleDelete}
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
            {newsletter.components.length > 0 && (
              <Badge variant='secondary'>
                {newsletter.components.length}{" "}
                {newsletter.components.length === 1
                  ? "Component"
                  : "Components"}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className='bg-muted/30 border-t px-6 py-3'>
        <div className='text-muted-foreground flex w-full items-center justify-between text-xs'>
          <span>Created {formatDate(newsletter.createdAt)}</span>
          {/* <Link
            href={`/main/newsletter/stats/${newsletter.id}`}
            className='text-primary hover:underline'
          >
            View Stats
          </Link> */}
        </div>
      </CardFooter>
    </Card>
  );
}
