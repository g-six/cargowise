import { Subheading } from "./heading";

export default function Loader({label = 'Thinking'}: {label?: string}) {
    return <div className="text-center pr-0 relative p-10">
        <div className="loader scale-25!" aria-label={label}></div>
        <Subheading className="absolute left-1/2 -translate-x-3/4 top-1/2 pt-8 -translate-y-1/2">{label}</Subheading>
    </div>
}