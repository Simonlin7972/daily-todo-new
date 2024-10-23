import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useTranslation } from 'react-i18next'

export function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage}>
      <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
