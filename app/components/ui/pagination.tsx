import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Link, LinkComponent } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkBasicProps = Pick<
  React.ComponentProps<typeof Button>,
  "size"
> &
  React.ComponentProps<LinkComponent<"a">>;

type PaginationLinkProps = {
  isActive?: boolean;
  children: (props: PaginationLinkBasicProps) => React.ReactNode;
} & PaginationLinkBasicProps;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <>
      {children({
        "aria-current": isActive ? "page" : undefined,
        "data-slot": "pagination-link",
        "data-active": isActive,
        className: cn(
          buttonVariants({
            variant: isActive ? "outline" : "ghost",
            size,
          }),
          className
        ),
        ...props,
      })}
    </>
  );
}

function PaginationPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <>
      {children({
        ...props,
        "aria-label": "Go to previous page",
        size: "default",
        className: cn("gap-1 px-2.5 sm:pl-2.5", className),
        children: (
          <>
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
          </>
        ),
      })}
    </>
  );
}

function PaginationNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <>
      {children({
        "aria-label": "Go to next page",
        size: "default",
        className: cn("gap-1 px-2.5 sm:pr-2.5", className),
        children: (
          <>
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon />
          </>
        ),
        ...props,
      })}
    </>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
