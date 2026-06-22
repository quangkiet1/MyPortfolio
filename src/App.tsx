import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  GitBranch,
  Layers3,
  Mail,
  Palette,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Button } from "./components/Button";
import { WebGLPortrait } from "./components/WebGLPortrait";
import { cn } from "./lib/utils";

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: "Tên Của Bạn",
  role: "Creative Frontend Developer",
  location: "Ho Chi Minh City, Vietnam",
  summary:
    "Mình thiết kế và xây dựng những trải nghiệm web có cảm giác sống động: giao diện rõ ràng, animation có chủ đích, hiệu năng tốt và một chút chất điện ảnh vừa đủ để sản phẩm đáng nhớ.",
  email: "hello@yourname.dev",
  github: "github.com/yourname",
  linkedin: "linkedin.com/in/yourname",
};

const stats = [
  ["05+", "năm kinh nghiệm"],
  ["32", "dự án hoàn thiện"],
  ["12", "thương hiệu đồng hành"],
];

const skills = [
  { icon: Code2, title: "Frontend", items: "React, Next.js, TypeScript" },
  { icon: WandSparkles, title: "Motion", items: "GSAP, Framer Motion, Lottie" },
  { icon: Layers3, title: "3D/WebGL", items: "Three.js, R3F, Shader basics" },
  { icon: Palette, title: "UI/UX", items: "Design systems, Figma, shadcn/ui" },
];

const projects = [
  {
    title: "Atlas Studio",
    type: "Brand website",
    year: "2026",
    detail:
      "Một website studio có hero WebGL, hệ motion theo scroll và component system dễ tái sử dụng.",
    stack: ["React", "GSAP", "Three.js"],
    color: "bg-coral",
  },
  {
    title: "Nova Commerce",
    type: "SaaS dashboard",
    year: "2025",
    detail:
      "Dashboard vận hành bán hàng với bảng dữ liệu nhanh, lọc thông minh và visual hierarchy rõ ràng.",
    stack: ["Next.js", "Tailwind", "shadcn/ui"],
    color: "bg-mint",
  },
  {
    title: "Muse Archive",
    type: "Interactive archive",
    year: "2025",
    detail:
      "Kho nội dung tương tác kết hợp animation route transition, masonry layout và preview giàu cảm xúc.",
    stack: ["Framer Motion", "CMS", "UX"],
    color: "bg-brass",
  },
];

const process = [
  ["01", "Lắng nghe", "Chốt mục tiêu, đối tượng người dùng và cảm giác thương hiệu."],
  ["02", "Thiết kế", "Dựng flow, layout, prototype motion và hệ component nhất quán."],
  ["03", "Xây dựng", "Code giao diện sạch, responsive, accessible và tối ưu hiệu năng."],
  ["04", "Tinh chỉnh", "Test cảm giác tương tác, polish animation và bàn giao tài liệu."],
];

function MagneticCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(element, {
        x: x * 0.04,
        y: y * 0.04,
        rotateX: -y * 0.02,
        rotateY: x * 0.02,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.45)",
      });
    };

    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);

    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("transform-gpu", className)}>
      {children}
    </div>
  );
}

export default function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
        });
      });

      gsap.to("[data-marquee]", {
        xPercent: -50,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen bg-paper text-ink antialiased">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-ink/10 bg-paper/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="font-display text-base font-bold">
            {profile.name}
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
            <a className="transition hover:text-ink" href="#work">
              Dự án
            </a>
            <a className="transition hover:text-ink" href="#skills">
              Kỹ năng
            </a>
            <a className="transition hover:text-ink" href="#contact">
              Liên hệ
            </a>
          </div>
          <a href={`mailto:${profile.email}`} aria-label="Gửi email">
            <Button className="h-10 px-3" variant="secondary">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Email</span>
            </Button>
          </a>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 bg-grid bg-[length:44px_44px] opacity-45" />
          <div className="absolute left-0 top-16 h-36 w-full bg-gradient-to-b from-paper to-transparent" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_0.92fr]">
            <div className="max-w-3xl">
              <div
                data-hero
                className="mb-5 inline-flex items-center gap-2 rounded-md border border-ink/10 bg-white/65 px-3 py-2 text-sm font-semibold shadow-insetLine backdrop-blur"
              >
                <Sparkles className="h-4 w-4 text-coral" />
                Available for selected projects
              </div>
              <h1
                data-hero
                className="font-display text-[clamp(3.2rem,11vw,8.5rem)] font-black uppercase leading-[0.84] tracking-normal"
              >
                Portfolio
                <span className="block text-coral">Cá Nhân</span>
              </h1>
              <p
                data-hero
                className="mt-7 max-w-2xl text-lg leading-8 text-ink/72 sm:text-xl"
              >
                {profile.summary}
              </p>
              <div data-hero className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#work">
                  <Button>
                    Xem dự án <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="/cv.pdf">
                  <Button variant="secondary">
                    <Download className="h-4 w-4" />
                    Tải CV
                  </Button>
                </a>
              </div>
              <div
                data-hero
                className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-ink/10 rounded-md border border-ink/10 bg-white/60 shadow-insetLine backdrop-blur"
              >
                {stats.map(([value, label]) => (
                  <div key={label} className="px-4 py-4">
                    <div className="font-display text-2xl font-black sm:text-3xl">
                      {value}
                    </div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-normal text-ink/55">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-hero className="relative min-h-[440px] lg:min-h-[620px]">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white via-paper to-mint/30 shadow-soft" />
              <div className="absolute inset-x-6 bottom-6 top-6 overflow-hidden rounded-md border border-ink/10 bg-white/35 backdrop-blur-sm">
                <WebGLPortrait />
              </div>
              <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.7, ease: "easeOut" }}
                className="absolute bottom-10 left-0 max-w-[18rem] rounded-md border border-ink/10 bg-paper/90 p-4 shadow-soft backdrop-blur"
              >
                <p className="text-xs font-bold uppercase tracking-normal text-ink/50">
                  Current focus
                </p>
                <p className="mt-2 text-sm font-semibold leading-6">
                  Building premium digital experiences with elegant motion and
                  practical design systems.
                </p>
              </motion.div>
              <div className="absolute right-3 top-4 rounded-md bg-ink px-3 py-2 text-sm font-bold text-paper">
                {profile.location}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-ink/10 bg-ink py-4 text-paper">
          <div data-marquee className="flex w-max items-center gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex items-center gap-8">
                {[
                  "Interaction Design",
                  "Frontend Engineering",
                  "Design Systems",
                  "WebGL Experiments",
                  "Motion Direction",
                ].map((item) => (
                  <span
                    key={`${groupIndex}-${item}`}
                    className="font-display text-2xl font-bold uppercase tracking-normal text-paper"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div data-reveal className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-normal text-coral">
                Kỹ năng
              </p>
              <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">
                Làm sản phẩm đẹp nhưng vẫn chạy mượt, dễ mở rộng.
              </h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {skills.map(({ icon: Icon, title, items }) => (
                <MagneticCard key={title} className="h-full">
                  <article
                    data-reveal
                    className="h-full rounded-md border border-ink/10 bg-white/65 p-6 shadow-insetLine transition duration-300 hover:bg-white"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-ink text-paper">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 font-display text-xl font-bold">
                      {title}
                    </h3>
                    <p className="mt-3 leading-7 text-ink/65">{items}</p>
                  </article>
                </MagneticCard>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div
              data-reveal
              className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-normal text-coral">
                  Dự án chọn lọc
                </p>
                <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">
                  Những giao diện có nhịp, có điểm nhấn và có lý do tồn tại.
                </h2>
              </div>
              <Button variant="secondary">
                <BriefcaseBusiness className="h-4 w-4" />
                Case studies
              </Button>
            </div>

            <div className="mt-12 grid gap-5">
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  data-reveal
                  className="group grid overflow-hidden rounded-md border border-ink/10 bg-paper shadow-insetLine transition duration-300 hover:-translate-y-1 hover:shadow-soft lg:grid-cols-[0.85fr_1.15fr]"
                >
                  <div
                    className={cn(
                      "relative min-h-[260px] overflow-hidden",
                      project.color,
                    )}
                  >
                    <div className="absolute inset-0 bg-grid bg-[length:34px_34px] opacity-25" />
                    <div className="absolute left-7 top-7 rounded-md bg-paper px-3 py-2 text-sm font-black">
                      0{index + 1}
                    </div>
                    <div className="absolute bottom-7 left-7 right-7">
                      <div className="h-24 rounded-md border border-ink/15 bg-paper/65 p-3 backdrop-blur">
                        <div className="flex h-full items-end gap-2">
                          <div className="h-12 flex-1 rounded-sm bg-ink/80" />
                          <div className="h-20 flex-1 rounded-sm bg-paper" />
                          <div className="h-16 flex-1 rounded-sm bg-ink/35" />
                          <div className="h-24 flex-1 rounded-sm bg-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="flex items-center justify-between gap-4 text-sm font-bold uppercase tracking-normal text-ink/45">
                        <span>{project.type}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="mt-5 font-display text-3xl font-black sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/68">
                        {project.detail}
                      </p>
                    </div>
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm font-semibold"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <Button className="h-10 px-3" variant="ghost">
                        <ArrowUpRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="text-sm font-bold uppercase tracking-normal text-coral">
                Quy trình
              </p>
              <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">
                Từ ý tưởng tới trải nghiệm có thể dùng thật.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {process.map(([number, title, text]) => (
                <div
                  key={number}
                  data-reveal
                  className="rounded-md border border-ink/10 bg-white/70 p-6 shadow-insetLine"
                >
                  <div className="font-display text-4xl font-black text-coral">
                    {number}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">
                    {title}
                  </h3>
                  <p className="mt-3 leading-7 text-ink/65">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-ink/10 bg-ink px-4 py-20 text-paper sm:px-6 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div data-reveal>
              <p className="text-sm font-bold uppercase tracking-normal text-mint">
                Liên hệ
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-4xl font-black leading-tight sm:text-6xl">
                Bạn có một sản phẩm đáng được kể bằng giao diện tốt hơn?
              </h2>
            </div>
            <div data-reveal className="rounded-md border border-paper/10 bg-paper/8 p-5">
              <a
                className="flex items-center justify-between gap-4 rounded-md bg-paper px-4 py-4 font-semibold text-ink transition hover:bg-white"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
                <Mail className="h-5 w-5" />
              </a>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <a
                  className="flex items-center justify-between rounded-md border border-paper/10 px-4 py-4 font-semibold transition hover:bg-paper/10"
                  href={`https://${profile.github}`}
                >
                  GitHub <GitBranch className="h-5 w-5" />
                </a>
                <a
                  className="flex items-center justify-between rounded-md border border-paper/10 px-4 py-4 font-semibold transition hover:bg-paper/10"
                  href={`https://${profile.linkedin}`}
                >
                  LinkedIn <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
