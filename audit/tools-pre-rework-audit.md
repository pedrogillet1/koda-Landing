# Tools Pre-Rework Audit

## tempo.html Issues Found
- Blue accent (#2563EB) used throughout for progress bar, selection states, hover, bottleneck label
- "Próxima" button (multi-select) appears in `.tp-next-wrap` below back button, not aligned on same row
- "Voltar" appears as separate element below options
- "Receber diagnóstico completo" is a raw underlined text link styled with blue
- Q2 uses "Drive" instead of "Google Drive"
- Q4 uses "Achar fonte/aprovação" instead of "Achar fonte ou aprovação"
- Share URLs use allybi.co instead of allybi.com.br
- Share text sounds like an ad ("Faça o seu!")
- "Outro" option in Q2 is vague (removed)

## diagnostico.html Issues Found
- Blue accent (#2563EB) used in progress fill, chip hover/selected, share URL, form focus
- No pre-start section — footer appears immediately after hero
- "Receber diagnóstico completo" is a raw underlined text link
- Bridge step uses blue rgba for Allybi-branded steps
- Q2 uses "Drive" as option (from prior fix, was already "Pasta local" but other pages had "Drive")
- Form focus states use blue box-shadow

## Both Pages
- Different interaction systems (tempo uses custom inline CSS; diagnostico uses allybi-token variables)
- No shared component classes
- Blue used as primary interaction color in both
