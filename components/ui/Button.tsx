import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ivory" | "outline" | "outline-light" | "accent";

const styles: Record<Variant, string> = {
  primary: "btn-primary",
  ivory: "btn-ivory",
  outline: "btn-outline",
  "outline-light": "btn-outline-light",
  accent: "btn bg-burgundy px-6 py-3 text-ivory hover:bg-burgundy-dark hover:shadow-lift",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  type?: "button" | "submit";
};

type ButtonAsLink = BaseProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", className, children, ...rest }: ButtonProps) {
  const classes = `${styles[variant]} ${className ?? ""}`.trim();

  if ("href" in rest && rest.href !== undefined) {
    const { href } = rest;
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button" } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}