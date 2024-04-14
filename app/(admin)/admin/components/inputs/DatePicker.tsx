"use client";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface DatePickerProps {
  date: Date;
  setDate: any;
}

export function DatePicker({ date, setDate }: DatePickerProps) {

  //format date like this : 2023-08-23T22:00:00.000Z but not for date like this : 2023-07-29T22:00:00.000Z
  const formatDate = (date: Date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let monthString = month.toString();
    let dayString = day.toString();

    if (month < 10) {
      monthString = "0" + monthString;
    }

    if (day < 10) {
      dayString = "0" + dayString;
    }

    return year + "-" + monthString + "-" + dayString + "T22:00:00.000Z";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"default"}
          className={cn(
            "w-[280px] justify-start text-left font-normal my-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {typeof date === "string" ? (
            <span>{format(parseISO(date), "PPP")}</span>
          ) : (
            <span>{format(parseISO(formatDate(date)), "PPP")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
