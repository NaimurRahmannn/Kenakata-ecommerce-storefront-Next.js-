import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  CreditCard,
  Headphones,
  Info,
  Lock,
  Mail,
  MapPin,
  RefreshCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

const orderItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    qty: 1,
    price: 129.99,
    image: "/images/headphone.png",
  },
  {
    id: 2,
    name: "Classic Watch",
    qty: 1,
    price: 199.99,
    image: "/images/watch.png",
  },
  {
    id: 3,
    name: "Leather Handbag",
    qty: 1,
    price: 149.99,
    image: "/images/bag.png",
  },
];

export default function CheckoutPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-neutral-900">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/cart" className="hover:text-neutral-900">
            Cart
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-neutral-700">Checkout</span>
        </div>

        <h1 className="mt-4 font-serif text-4xl font-semibold text-neutral-950 md:text-5xl">
          Checkout
        </h1>

        {/* Steps */}
        <div className="mt-6 flex max-w-3xl items-center">
          <CheckoutStep number="1" title="Shipping" active />
          <div className="h-px flex-1 bg-[#c98a24]" />
          <CheckoutStep number="2" title="Payment" />
          <div className="h-px flex-1 bg-neutral-200" />
          <CheckoutStep number="3" title="Review" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_410px]">
          {/* Left Form */}
          <div className="space-y-5">
            <CheckoutCard
              icon={<Mail className="h-5 w-5" />}
              title="Contact Information"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Email Address" value="hello@kenakata.com" required />
                <Input label="Phone Number" value="+1 (555) 123-4567" required />
              </div>
            </CheckoutCard>

            <CheckoutCard
              icon={<MapPin className="h-5 w-5" />}
              title="Shipping Address"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Full Name" value="John Doe" required />
                <SelectInput label="Country / Region" value="United States" required />
              </div>

              <div className="mt-4 space-y-4">
                <Input label="Street Address" value="123 Luxury Lane" required />
                <Input
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  label=""
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <Input label="City" value="New York" required />
                  <SelectInput label="State / Province" value="New York" required />
                  <Input label="Postal Code" value="10001" required />
                </div>
              </div>

              <label className="mt-4 flex items-center gap-3 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-neutral-950"
                />
                Use billing address as shipping address
              </label>
            </CheckoutCard>

            <CheckoutCard icon={<Truck className="h-5 w-5" />} title="Delivery Method">
              <div className="space-y-2">
                <DeliveryOption
                  title="Standard Shipping"
                  time="3–5 business days"
                  price="FREE"
                  active
                />
                <DeliveryOption
                  title="Expedited Shipping"
                  time="2–3 business days"
                  price="$9.99"
                />
                <DeliveryOption
                  title="Overnight Shipping"
                  time="1 business day"
                  price="$19.99"
                />
              </div>
            </CheckoutCard>

            <CheckoutCard
              icon={<CreditCard className="h-5 w-5" />}
              title="Payment Method"
            >
              <div className="grid gap-3 md:grid-cols-3">
                <PaymentTab active icon={<CreditCard className="h-4 w-4" />} text="Credit Card" />
                <PaymentTab text="PayPal" image="/images/paypal.png" />
                <PaymentTab text="Apple Pay" image="/images/Apple_icon.png" />
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input label="Name on Card" value="John Doe" required />
                <div className="relative">
                  <Input label="Card Number" value="4242 4242 4242 4242" required />
                  <span className="absolute bottom-3 right-4 text-xs font-bold text-blue-700">
                    VISA
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Input label="Expiration Date" value="12 / 28" required />
                <div className="relative">
                  <Input label="Security Code" value="123" required />
                  <Info className="absolute bottom-3 right-4 h-4 w-4 text-neutral-500" />
                </div>
                <Input label="Billing ZIP / Postal Code" value="10001" required />
              </div>

              <label className="mt-4 flex items-center gap-3 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-neutral-950"
                />
                Save my payment information for a faster checkout
              </label>
            </CheckoutCard>
          </div>

          {/* Right Summary */}
          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl font-semibold text-neutral-950">
              Order Summary
            </h2>

            <div className="mt-5 space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-base font-semibold text-neutral-950">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      Qty: {item.qty}
                    </p>
                  </div>

                  <p className="font-semibold text-neutral-950">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-5">
              <SummaryRow label="Subtotal (3 items)" value="$479.97" />
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-neutral-700">
                    Shipping <Info className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold text-green-700">FREE</span>
                </div>
                <p className="mt-1 text-sm text-green-700">
                  Standard Shipping (3–5 business days)
                </p>
              </div>
              <SummaryRow label="Tax (estimated)" value="$38.40" info />
            </div>

            <div className="mt-5 border-t border-neutral-200 pt-5">
              <p className="text-sm text-neutral-700">Have a discount code?</p>
              <div className="mt-2 flex gap-3">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="h-11 flex-1 rounded-lg border border-neutral-300 px-4 text-sm outline-none focus:border-neutral-900"
                />
                <button className="h-11 rounded-lg bg-[#ead8c3] px-7 text-sm font-semibold text-neutral-950 transition hover:bg-[#dfc4a6]">
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-5 border-t border-neutral-200 pt-5">
              <div className="flex items-end justify-between">
                <span className="font-serif text-2xl font-semibold">Total</span>
                <div className="text-right">
                  <span className="mr-2 text-sm text-neutral-500">USD</span>
                  <span className="text-3xl font-bold text-neutral-950">
                    $518.37
                  </span>
                </div>
              </div>

              <button className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800">
                <Lock className="h-4 w-4" />
                Place Order
              </button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-800">
                  <ShieldCheck className="h-4 w-4" />
                  Secure Checkout
                </div>
                <p className="mt-1 text-sm text-neutral-500">
                  Your information is encrypted and safe.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-3 rounded-lg border border-neutral-200 py-4 text-center">
                <MiniFeature
                  icon={<RefreshCcw className="h-5 w-5" />}
                  title="Free Returns"
                  text="30-day return policy"
                />
                <MiniFeature
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Secure Payment"
                  text="100% secure checkout"
                />
                <MiniFeature
                  icon={<Headphones className="h-5 w-5" />}
                  title="Customer Support"
                  text="24/7 dedicated support"
                />
              </div>

              <div className="mt-5">
                <p className="text-sm text-neutral-600">We accept</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {["VISA", "MC", "AMEX", "Pay", "PayPal", "shop"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-700"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function CheckoutStep({
  number,
  title,
  active = false,
}: {
  number: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
          active
            ? "border-[#c98a24] bg-[#c98a24] text-white"
            : "border-neutral-200 bg-white text-neutral-950"
        }`}
      >
        {number}
      </span>
      <span
        className={`text-sm font-medium ${
          active ? "text-[#c98a24]" : "text-neutral-700"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function CheckoutCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
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

function Input({
  label,
  value,
  placeholder,
  required = false,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-xs font-medium text-neutral-500">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  required = false,
}: {
  label: string;
  value: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-neutral-500">
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <div className="relative">
        <input
          defaultValue={value}
          readOnly
          className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 pr-10 text-sm text-neutral-950 outline-none transition focus:border-neutral-900"
        />
        <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      </div>
    </label>
  );
}

function DeliveryOption({
  title,
  time,
  price,
  active = false,
}: {
  title: string;
  time: string;
  price: string;
  active?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
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
    </label>
  );
}

function PaymentTab({
  text,
  icon,
  image,
  active = false,
}: {
  text: string;
  icon?: React.ReactNode;
  image?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition ${
        active
          ? "border-[#c98a24] bg-white text-neutral-950"
          : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
      }`}
    >
      {icon}
      {image && (
        <Image
          src={image}
          alt={text}
          width={18}
          height={18}
          className="h-[18px] w-[18px] object-contain"
        />
      )}
      {text}
    </button>
  );
}

function SummaryRow({
  label,
  value,
  info = false,
}: {
  label: string;
  value: string;
  info?: boolean;
}) {
  return (
    <div className="mt-3 flex items-center justify-between text-sm">
      <span className="flex items-center gap-1 text-neutral-700">
        {label}
        {info && <Info className="h-3.5 w-3.5" />}
      </span>
      <span className="font-semibold text-neutral-950">{value}</span>
    </div>
  );
}

function MiniFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border-r border-neutral-200 px-2 last:border-r-0">
      <div className="mx-auto flex justify-center text-[#c17a1c]">{icon}</div>
      <h4 className="mt-2 text-xs font-semibold text-neutral-950">{title}</h4>
      <p className="mt-1 text-[11px] text-neutral-500">{text}</p>
    </div>
  );
}