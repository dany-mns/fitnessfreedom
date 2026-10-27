import type { Language } from '../i18n'

export type LocalizedText = Record<Language, string>

interface FieldBase {
  id: string
  label: LocalizedText
  hint?: LocalizedText
  required?: boolean
}

export interface TextField extends FieldBase {
  type: 'text' | 'textarea' | 'email' | 'number'
  placeholder?: LocalizedText
}

export interface ChoiceOption {
  value: string
  label: LocalizedText
}

export interface ChoiceField extends FieldBase {
  type: 'select' | 'radio' | 'checkbox'
  options: ChoiceOption[]
}

export type FormField = TextField | ChoiceField

export interface FormDefinition {
  slug: string
  badge: LocalizedText
  title: LocalizedText
  highlight: LocalizedText
  description: LocalizedText
  perks?: LocalizedText[]
  fields?: FormField[]
  successMessage?: LocalizedText
}

export const forms: FormDefinition[] = [
  {
    slug: 'coaching',
    badge: { ro: 'Aplicație coaching 1:1', en: '1:1 coaching application' },
    title: { ro: 'Aplică pentru', en: 'Apply for' },
    highlight: { ro: 'coaching 1:1', en: '1:1 coaching' },
    description: {
      ro: 'Răspunde la câteva întrebări ca să înțeleg unde ești acum și ce vrei să obții. Apoi te sun pentru o consultație gratuită de 30 de minute.',
      en: 'Answer a few questions so I understand where you are now and what you want to achieve. Then I will call you for a free 30-minute consultation.',
    },
    perks: [
      { ro: 'Plan de antrenament personalizat', en: 'Personalized training plan' },
      { ro: 'Plan de nutriție flexibil', en: 'Flexible nutrition plan' },
      { ro: 'Check-in săptămânal și ajustări', en: 'Weekly check-in and adjustments' },
      { ro: 'Suport direct', en: 'Direct support' },
    ],
    fields: [
      {
        id: 'goal',
        type: 'radio',
        required: true,
        label: { ro: 'Care este obiectivul tău principal?', en: 'What is your main goal?' },
        options: [
          { value: 'fat-loss', label: { ro: 'Slăbit', en: 'Fat loss' } },
          { value: 'muscle-gain', label: { ro: 'Masă musculară', en: 'Muscle gain' } },
          { value: 'recomposition', label: { ro: 'Tonifiere', en: 'Body recomposition' } },
          { value: 'health', label: { ro: 'Sănătate și energie', en: 'Health and energy' } },
        ],
      },
      {
        id: 'experience',
        type: 'radio',
        required: true,
        label: { ro: 'Cât de multă experiență ai cu antrenamentul?', en: 'How much training experience do you have?' },
        options: [
          { value: 'beginner', label: { ro: 'Începător', en: 'Beginner' } },
          { value: 'intermediate', label: { ro: 'Intermediar', en: 'Intermediate' } },
          { value: 'advanced', label: { ro: 'Avansat', en: 'Advanced' } },
        ],
      },
      {
        id: 'trainingLocation',
        type: 'radio',
        required: true,
        label: { ro: 'Unde te vei antrena?', en: 'Where will you train?' },
        options: [
          { value: 'gym', label: { ro: 'La sală', en: 'At the gym' } },
          { value: 'home', label: { ro: 'Acasă', en: 'At home' } },
          { value: 'both', label: { ro: 'Ambele', en: 'Both' } },
        ],
      },
      {
        id: 'startDate',
        type: 'select',
        required: true,
        label: { ro: 'Când vrei să începi?', en: 'When do you want to start?' },
        options: [
          { value: 'now', label: { ro: 'Cât mai curând', en: 'As soon as possible' } },
          { value: '2-weeks', label: { ro: 'În următoarele 2 săptămâni', en: 'Within the next 2 weeks' } },
          { value: '1-month', label: { ro: 'În următoarea lună', en: 'Within the next month' } },
          { value: 'researching', label: { ro: 'Doar mă informez', en: 'Just researching' } },
        ],
      },
      {
        id: 'notes',
        type: 'textarea',
        label: { ro: 'Ceva ce ar trebui să știu?', en: 'Anything I should know?' },
        placeholder: { ro: 'Accidentări, program, preferințe alimentare...', en: 'Injuries, schedule, food preferences...' },
      },
    ],
  },
  {
    slug: 'christmas',
    badge: { ro: 'Campanie de Crăciun', en: 'Christmas Campaign' },
    title: { ro: 'Intră în noul an', en: 'Start the new year' },
    highlight: { ro: 'în cea mai bună formă', en: 'in your best shape' },
    description: {
      ro: 'Locuri limitate pentru programul de coaching de sărbători. Lasă-ne datele tale și te sunăm noi pentru o discuție gratuită.',
      en: 'Limited spots for the holiday coaching program. Leave your details and we will call you for a free consultation.',
    },
    perks: [
      { ro: 'Plan de antrenament personalizat', en: 'Personalized training plan' },
      { ro: 'Ghid de nutriție pentru sărbători', en: 'Holiday nutrition guide' },
      { ro: 'Check-in săptămânal 1:1', en: 'Weekly 1:1 check-in' },
    ],
    fields: [
      {
        id: 'goal',
        type: 'radio',
        required: true,
        label: { ro: 'Care este obiectivul tău principal?', en: 'What is your main goal?' },
        options: [
          { value: 'fat-loss', label: { ro: 'Slăbit', en: 'Fat loss' } },
          { value: 'muscle-gain', label: { ro: 'Masă musculară', en: 'Muscle gain' } },
          { value: 'recomposition', label: { ro: 'Tonifiere', en: 'Body recomposition' } },
        ],
      },
    ],
  },
  {
    slug: 'sixpack',
    badge: { ro: 'Provocarea Sixpack', en: 'Sixpack Challenge' },
    title: { ro: 'Abdomenul pe care', en: 'The abs you have' },
    highlight: { ro: 'ți l-ai dorit mereu', en: 'always wanted' },
    description: {
      ro: '8 săptămâni de antrenament și nutriție ghidate pas cu pas. Completează formularul și află dacă ești potrivit pentru provocare.',
      en: '8 weeks of step-by-step guided training and nutrition. Fill in the form to find out if you are a good fit for the challenge.',
    },
    perks: [
      { ro: 'Program de 8 săptămâni', en: '8-week program' },
      { ro: 'Rețete și liste de cumpărături', en: 'Recipes and shopping lists' },
      { ro: 'Suport pe WhatsApp', en: 'WhatsApp support' },
    ],
    fields: [
      {
        id: 'trainingFrequency',
        type: 'select',
        required: true,
        label: { ro: 'Cât de des te antrenezi acum?', en: 'How often do you train now?' },
        options: [
          { value: 'never', label: { ro: 'Deloc', en: 'Not at all' } },
          { value: '1-2', label: { ro: '1-2 ori pe săptămână', en: '1-2 times a week' } },
          { value: '3-4', label: { ro: '3-4 ori pe săptămână', en: '3-4 times a week' } },
          { value: '5+', label: { ro: '5+ ori pe săptămână', en: '5+ times a week' } },
        ],
      },
      {
        id: 'obstacles',
        type: 'checkbox',
        label: { ro: 'Ce te-a oprit până acum?', en: 'What has held you back so far?' },
        hint: { ro: 'Poți alege mai multe variante', en: 'You can pick more than one' },
        options: [
          { value: 'time', label: { ro: 'Lipsa timpului', en: 'Lack of time' } },
          { value: 'diet', label: { ro: 'Alimentația', en: 'Nutrition' } },
          { value: 'motivation', label: { ro: 'Motivația', en: 'Motivation' } },
          { value: 'knowledge', label: { ro: 'Nu știam de unde să încep', en: 'Not knowing where to start' } },
        ],
      },
      {
        id: 'notes',
        type: 'textarea',
        label: { ro: 'Altceva ce ar trebui să știm?', en: 'Anything else we should know?' },
        placeholder: { ro: 'Accidentări, program, preferințe...', en: 'Injuries, schedule, preferences...' },
      },
    ],
  },
]

export const findForm = (slug: string | undefined) => forms.find((form) => form.slug === slug)
