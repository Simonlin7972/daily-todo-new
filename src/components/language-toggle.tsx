import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function LanguageToggle() {
  const { i18n, t } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleLanguage} className="w-10 h-10">
            <Globe className="h-[1.5rem] w-[1.5rem]" />
            <span className="sr-only">Toggle language</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('toggleLanguage')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
