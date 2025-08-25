import { PropsWithChildren } from "react"
import { motion } from "framer-motion";

export default function Card(p: PropsWithChildren<{ className?: string; rounded?: 'tl' | 'tr' | 'bl' | 'br' | 't' | 'b' | 'l' | 'r' | 'full'}>) {
    const { children, ...props } = p
    const roundedMap: Record<NonNullable<typeof props.rounded>, string> = {
        tl: "rounded-tl-2xl",
        tr: "rounded-tr-2xl",
        bl: "rounded-bl-2xl",
        br: "rounded-br-2xl",
        t: "rounded-t-2xl",
        b: "rounded-b-2xl",
        l: "rounded-l-2xl",
        r: "rounded-r-2xl",
        full: "rounded-2xl",
    }
    let roundedClass = props.rounded ? roundedMap[props.rounded] : "rounded-2xl"
    if (props.rounded === 't') roundedClass = "max-lg:rounded-t-2xl"
    if (props.rounded === 'b') roundedClass = "max-lg:rounded-b-2xl"
    if (props.rounded === 'l') roundedClass = "max-lg:rounded-l-2xl"
    if (props.rounded === 'r') roundedClass = "max-lg:rounded-r-2xl"

    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}  data-component='card' {...props} className={`relative ${props.className ?? ""}`}>
            <div className={`absolute inset-px bg-white ${roundedClass} dark:bg-gray-800`} />
            <div className={`pointer-events-none absolute inset-px shadow-sm outline outline-black/5 ${roundedClass} dark:outline-white/15`} />
            <div className="relative">{children}</div>
        </motion.div>
    )
}