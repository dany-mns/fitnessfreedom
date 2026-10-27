export const fieldClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/[0.07] ${
    hasError
      ? 'border-red-400/60 focus:border-red-400'
      : 'border-white/10 hover:border-white/20 focus:border-primary'
  }`

