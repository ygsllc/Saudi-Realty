import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Khalid A.",
      feedback:
        "Saudi Realty’s AI concierge helped me find a villa in NEOM within minutes. Superb bilingual experience!",
    },
    {
      name: "Sarah M.",
      feedback: "The Islamic finance calculator was invaluable. I instantly understood my halal financing options.",
    },
    {
      name: "Thomas L.",
      feedback: "As an overseas investor, Vision 2030 insights and project pages gave me great confidence to invest.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-10 text-3xl font-bold text-center">What Our Clients Say</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>{t.name.split(" ")[0][0]}</AvatarFallback>
                </Avatar>
                <p className="text-muted-foreground text-sm">{`“${t.feedback}”`}</p>
                <div className="font-semibold">{t.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
