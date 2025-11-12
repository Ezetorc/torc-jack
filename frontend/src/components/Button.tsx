import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function Button(
	props: {
		children: ReactNode
	} & ButtonHTMLAttributes<HTMLButtonElement>
) {
	return (
		<button
			{...props}
			className={`font-medium cursor-pointer hover:-translate-y-1 transition-transform p-5 rounded-2xl ${props.className}`}
		>
			{props.children}
		</button>
	)
}
