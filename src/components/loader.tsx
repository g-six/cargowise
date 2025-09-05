import { clsx } from "clsx";
import { Subheading } from "./heading";

export default function Loader({label = 'Thinking'}: {label?: string}) {
    return <div className="text-center pr-0 relative p-10">
        <div className="loader scale-25!" aria-label={label}></div>
        <Subheading className="absolute left-1/2 -translate-x-3/4 top-1/2 pt-8 -translate-y-1/2">{label}</Subheading>
    </div>
}

export function Spinner({ className }: { className?: string }) {
    return (
        <svg
            className={clsx('animate-spin', className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    )
}