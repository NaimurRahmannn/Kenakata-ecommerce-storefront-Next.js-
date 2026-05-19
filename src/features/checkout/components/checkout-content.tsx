"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  CreditCard,
  Info,
  Mail,
  MapPin,
  Truck,
} from "lucide-react";
import { useForm, useWatch, type FieldPath, type UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { CheckoutOrderSummary } from "@/features/checkout/components/checkout-order-summary";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

const DELIVERY_METHODS = ["standard", "expedited", "overnight"] as const;
const PAYMENT_METHODS = ["card", "paypal", "apple"] as const;

type DeliveryMethod = (typeof DELIVERY_METHODS)[number];
type PaymentMethod = (typeof PAYMENT_METHODS)[number];

const checkoutSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email"),
    phone: z.string().min(1, "Phone number is required"),
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    country: z.string().min(1, "Country is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    useBillingAsShipping: z.boolean(),
    deliveryMethod: z.enum(DELIVERY_METHODS),
    paymentMethod: z.enum(PAYMENT_METHODS),
    nameOnCard: z.string().optional(),
    cardNumber: z.string().optional(),
    expirationDate: z.string().optional(),
    securityCode: z.string().optional(),
    billingPostalCode: z.string().optional(),
    savePaymentInfo: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod !== "card") {
      return;
    }

    if (!data.nameOnCard?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name on card is required",
        path: ["nameOnCard"],
      });
    }

    if (!data.cardNumber?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Card number is required",
        path: ["cardNumber"],
      });
    }

    if (!data.expirationDate?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expiration date is required",
        path: ["expirationDate"],
      });
    }

    if (!data.securityCode?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Security code is required",
        path: ["securityCode"],
      });
    }

    if (!data.billingPostalCode?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing postal code is required",
        path: ["billingPostalCode"],
      });
    }
  });

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

type CheckoutDraft = Partial<CheckoutFormValues>;

const DRAFT_STORAGE_KEY = "kenakata-checkout-draft";

const isBrowser = typeof window !== "undefined";

const defaultValues: CheckoutFormValues = {
  email: "",
  phone: "",
  fullName: "",
  country: "",
  streetAddress: "",
  apartment: "",
  city: "",
  state: "",
  postalCode: "",
  useBillingAsShipping: true,
  deliveryMethod: "standard",
  paymentMethod: "card",
  nameOnCard: "",
  cardNumber: "",
  expirationDate: "",
  securityCode: "",
  billingPostalCode: "",
  savePaymentInfo: true,
};

const shippingOptions = [
  {
    id: "standard",
    title: "Standard Shipping",
    time: "3-5 business days",
    price: 0,
  },
  {
    id: "expedited",
    title: "Expedited Shipping",
    time: "2-3 business days",
    price: 9.99,
  },
  {
    id: "overnight",
    title: "Overnight Shipping",
    time: "1 business day",
    price: 19.99,
  },
] as const;

const loadDraft = (): CheckoutDraft | null => {
  if (!isBrowser) {
    return null;
  }

  const stored = window.localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as CheckoutDraft;
  } catch {
    return null;
  }
};

const saveDraft = (draft: CheckoutDraft) => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore storage errors.
  }
};

const clearDraft = () => {
  if (!isBrowser) {
    return;
  }

  window.localStorage.removeItem(DRAFT_STORAGE_KEY);
};

export function CheckoutContent() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [draftLoaded, setDraftLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  const watchedValues = useWatch({ control });
  const deliveryMethod =
    useWatch({ control, name: "deliveryMethod" }) ??
    defaultValues.deliveryMethod;
  const paymentMethod =
    useWatch({ control, name: "paymentMethod" }) ??
    defaultValues.paymentMethod;

  const selectedShipping =
    shippingOptions.find((option) => option.id === deliveryMethod) ??
    shippingOptions[0];
  const shippingDescription = `${selectedShipping.title} (${selectedShipping.time})`;

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      reset({ ...defaultValues, ...draft });
    }
    setDraftLoaded(true);
  }, [reset]);

  useEffect(() => {
    if (!draftLoaded || !watchedValues) {
      return;
    }

    saveDraft(watchedValues);
  }, [draftLoaded, watchedValues]);

  const onSubmit = async (_values: CheckoutFormValues) => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    toast.success("Order placed successfully");
    clearCart();
    clearDraft();
    reset(defaultValues);
  };

  const handleDeliverySelect = (method: DeliveryMethod) => {
    setValue("deliveryMethod", method, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setValue("paymentMethod", method, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const formId = "checkout-form";
  const isCardPayment = paymentMethod === "card";

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_410px]">
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <CheckoutCard
          icon={<Mail className="h-5 w-5" />}
          title="Contact Information"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id="email"
              label="Email Address"
              placeholder="hello@kenakata.com"
              autoComplete="email"
              required
              register={register}
              error={errors.email?.message}
            />
            <InputField
              id="phone"
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
              required
              register={register}
              error={errors.phone?.message}
            />
          </div>
        </CheckoutCard>

        <CheckoutCard
          icon={<MapPin className="h-5 w-5" />}
          title="Shipping Address"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id="fullName"
              label="Full Name"
              placeholder="John Doe"
              autoComplete="name"
              required
              register={register}
              error={errors.fullName?.message}
            />
            <SelectField
              id="country"
              label="Country / Region"
              placeholder="United States"
              required
              register={register}
              error={errors.country?.message}
            />
          </div>

          <div className="mt-4 space-y-4">
            <InputField
              id="streetAddress"
              label="Street Address"
              placeholder="123 Luxury Lane"
              autoComplete="street-address"
              required
              register={register}
              error={errors.streetAddress?.message}
            />
            <InputField
              id="apartment"
              label=""
              placeholder="Apartment, suite, unit, etc. (optional)"
              autoComplete="address-line2"
              register={register}
              error={errors.apartment?.message}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <InputField
                id="city"
                label="City"
                placeholder="New York"
                autoComplete="address-level2"
                required
                register={register}
                error={errors.city?.message}
              />
              <SelectField
                id="state"
                label="State / Province"
                placeholder="New York"
                required
                register={register}
                error={errors.state?.message}
              />
              <InputField
                id="postalCode"
                label="Postal Code"
                placeholder="10001"
                autoComplete="postal-code"
                required
                register={register}
                error={errors.postalCode?.message}
              />
            </div>
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="h-4 w-4 accent-neutral-950"
              {...register("useBillingAsShipping")}
            />
            Use billing address as shipping address
          </label>
        </CheckoutCard>

        <CheckoutCard icon={<Truck className="h-5 w-5" />} title="Delivery Method">
          <div className="space-y-2">
            {shippingOptions.map((option) => (
              <DeliveryOption
                key={option.id}
                title={option.title}
                time={option.time}
                price={
                  option.price === 0
                    ? "FREE"
                    : formatCurrency(option.price)
                }
                active={deliveryMethod === option.id}
                onSelect={() => handleDeliverySelect(option.id)}
              />
            ))}
          </div>
          {errors.deliveryMethod ? (
            <p className="mt-2 text-xs text-rose-600">
              {errors.deliveryMethod.message}
            </p>
          ) : null}
        </CheckoutCard>

        <CheckoutCard
          icon={<CreditCard className="h-5 w-5" />}
          title="Payment Method"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <PaymentTab
              active={paymentMethod === "card"}
              icon={<CreditCard className="h-4 w-4" />}
              text="Credit Card"
              onSelect={() => handlePaymentSelect("card")}
            />
            <PaymentTab
              active={paymentMethod === "paypal"}
              text="PayPal"
              image="/images/paypal.png"
              onSelect={() => handlePaymentSelect("paypal")}
            />
            <PaymentTab
              active={paymentMethod === "apple"}
              text="Apple Pay"
              image="/images/Apple_icon.png"
              onSelect={() => handlePaymentSelect("apple")}
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <InputField
              id="nameOnCard"
              label="Name on Card"
              placeholder="John Doe"
              autoComplete="cc-name"
              required={isCardPayment}
              disabled={!isCardPayment}
              register={register}
              error={errors.nameOnCard?.message}
            />
            <InputField
              id="cardNumber"
              label="Card Number"
              placeholder="4242 4242 4242 4242"
              autoComplete="cc-number"
              inputMode="numeric"
              required={isCardPayment}
              disabled={!isCardPayment}
              register={register}
              error={errors.cardNumber?.message}
              inputClassName="pr-12"
              suffix={
                <span className="absolute bottom-3 right-4 text-xs font-bold text-blue-700">
                  VISA
                </span>
              }
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InputField
              id="expirationDate"
              label="Expiration Date"
              placeholder="12 / 28"
              autoComplete="cc-exp"
              required={isCardPayment}
              disabled={!isCardPayment}
              register={register}
              error={errors.expirationDate?.message}
            />
            <InputField
              id="securityCode"
              label="Security Code"
              placeholder="123"
              autoComplete="cc-csc"
              required={isCardPayment}
              disabled={!isCardPayment}
              register={register}
              error={errors.securityCode?.message}
              inputClassName="pr-10"
              suffix={
                <Info className="absolute bottom-3 right-4 h-4 w-4 text-neutral-500" />
              }
            />
            <InputField
              id="billingPostalCode"
              label="Billing ZIP / Postal Code"
              placeholder="10001"
              autoComplete="postal-code"
              required={isCardPayment}
              disabled={!isCardPayment}
              register={register}
              error={errors.billingPostalCode?.message}
            />
          </div>

          {!isCardPayment ? (
            <p className="mt-3 text-sm text-neutral-500">
              You will be redirected to complete this payment method.
            </p>
          ) : null}

          <label className="mt-4 flex items-center gap-3 text-sm text-neutral-700">
            <input
              type="checkbox"
              className="h-4 w-4 accent-neutral-950"
              {...register("savePaymentInfo")}
            />
            Save my payment information for a faster checkout
          </label>
        </CheckoutCard>
      </form>

      <CheckoutOrderSummary
        shippingPrice={selectedShipping.price}
        shippingDescription={shippingDescription}
        formId={formId}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

type CheckoutCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

function CheckoutCard({ icon, title, children }: CheckoutCardProps) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="grid gap-5 md:grid-cols-[48px_1fr]">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f7eee6] text-[#c17a1c]">
          {icon}
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold text-neutral-950">
            {title}
          </h2>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

type InputFieldProps = {
  id: FieldPath<CheckoutFormValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  register: UseFormRegister<CheckoutFormValues>;
  error?: string;
  disabled?: boolean;
  inputClassName?: string;
  suffix?: ReactNode;
};

function InputField({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  register,
  error,
  disabled = false,
  inputClassName,
  suffix,
}: InputFieldProps) {
  const fieldId = id.toString();
  const errorId = `${fieldId}-error`;

  return (
    <label className="block">
      {label ? (
        <span className="mb-1 block text-xs font-medium text-neutral-500">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      ) : null}
      <div className="relative">
        <input
          id={fieldId}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          className={`h-11 w-full rounded-lg border bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 ${
            error ? "border-rose-500 focus:border-rose-500" : "border-neutral-300"
          } ${disabled ? "bg-neutral-100 text-neutral-400" : ""} ${
            inputClassName ?? ""
          }`}
          {...register(id)}
        />
        {suffix}
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-rose-600">
          {error}
        </p>
      ) : null}
    </label>
  );
}

type SelectFieldProps = Omit<InputFieldProps, "suffix" | "inputClassName">;

function SelectField(props: SelectFieldProps) {
  return (
    <InputField
      {...props}
      inputClassName="pr-10"
      suffix={
        <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      }
    />
  );
}

type DeliveryOptionProps = {
  title: string;
  time: string;
  price: string;
  active?: boolean;
  onSelect: () => void;
};

function DeliveryOption({
  title,
  time,
  price,
  active = false,
  onSelect,
}: DeliveryOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
        active
          ? "border-[#c98a24] bg-[#fffaf4]"
          : "border-neutral-200 hover:border-neutral-400"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full border ${
          active
            ? "border-[#c98a24] bg-[#c98a24] ring-2 ring-white"
            : "border-neutral-300"
        }`}
      />
      <span className="font-medium text-neutral-950">{title}</span>
      <span className="ml-auto text-neutral-500 md:ml-20">{time}</span>
      <span
        className={`ml-auto font-semibold ${
          price === "FREE" ? "text-green-700" : "text-neutral-950"
        }`}
      >
        {price}
      </span>
    </button>
  );
}

type PaymentTabProps = {
  text: string;
  icon?: ReactNode;
  image?: string;
  active?: boolean;
  onSelect: () => void;
};

function PaymentTab({
  text,
  icon,
  image,
  active = false,
  onSelect,
}: PaymentTabProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition ${
        active
          ? "border-[#c98a24] bg-white text-neutral-950"
          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
      }`}
    >
      {icon}
      {image ? (
        <Image
          src={image}
          alt={text}
          width={18}
          height={18}
          className="h-[18px] w-[18px] object-contain"
        />
      ) : null}
      {text}
    </button>
  );
}
