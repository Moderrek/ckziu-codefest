import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { FAQ } from '@/config/constants';

export default function FaqSection() {
  return (
    <div className="container mx-auto flex justify-center">
      <Accordion type="multiple" className="w-full lg:w-1/2">
        {FAQ.map((faq, idx) => {
          return (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{faq.title}</AccordionTrigger>
              <AccordionContent>{faq.content}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
