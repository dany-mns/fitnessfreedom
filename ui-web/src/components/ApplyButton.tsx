import { Link } from 'react-router-dom'
import { APPLY_FORM_PATH } from '../config/links'
import { localizedPath, useLanguage } from '../i18n'
import { ArrowRightIcon } from './icons'

const ApplyButton = ({ label }: { label: string }) => {
  const { language } = useLanguage()

  return (
    <Link to={localizedPath(language, APPLY_FORM_PATH)} className="btn-primary group">
      {label}
      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

export default ApplyButton
