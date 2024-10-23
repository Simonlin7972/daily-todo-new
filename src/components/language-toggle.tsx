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
          <Button 
            variant="outline" 
            onClick={toggleLanguage} 
            className="w-auto h-10 px-3 flex items-center space-x-2"
          >
            <Globe className="h-[1rem] w-[1rem]" />
            <span>{i18n.language === 'en' ? 'EN' : '繁中'}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('toggleLanguage')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
