import type { ButtonHTMLAttributes, ReactNode } from 'react'

export function Button(
	props: {
		children: ReactNode
	} & ButtonHTMLAttributes<HTMLButtonElement>
) {
	return (
		<button
			type='button'
			className={`cursor-pointer text-3xl p-5 rounded-2xl ${props.className}`}
			{...props}
		>
			{props.children}
		</button>
	)
}
