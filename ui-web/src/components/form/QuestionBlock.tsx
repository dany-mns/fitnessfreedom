import type { ReactNode } from 'react'

interface QuestionBlockProps {
  index: number
  labelId: string
  errorId: string
  label: string
  hint?: string
  optionalLabel?: string
  error?: string | null
  children: ReactNode
}

const QuestionBlock = ({ index, labelId, errorId, label, hint, optionalLabel, error, children }: QuestionBlockProps) => (
  <div className="py-6 first:pt-0 last:pb-0">
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs font-semibold text-[#dabc68] tabular-nums">
        {String(index).padStart(2, '0')}
      </span>
      <div>
        <div id={labelId} className="text-base font-semibold text-white sm:text-lg">
          {label}
          {optionalLabel && (
            <span className="ml-2 align-middle text-[11px] font-medium uppercase tracking-wider text-white/35">
              {optionalLabel}
            </span>
          )}
        </div>
        {hint && <p className="mt-1 text-sm text-white/50">{hint}</p>}
      </div>
    </div>
    <div className="mt-4">{children}</div>
    {error && (
      <p id={errorId} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
        <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 102 0v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
)

export default QuestionBlock
