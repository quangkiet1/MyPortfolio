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
import { cn } from "./lib/utils";

gsap.registerPlugin(ScrollTrigger);

const profile = {
  name: "Huỳnh Quang Kiệt",
  role: "Lập trình viên (Fullstack Developer)",
  location: "Thủ Đức, Hồ Chí Minh, Vietnam",
  summary:
    "Sinh viên ngành Công nghệ Thông tin tại HUTECH với định hướng trở thành Web Developer. Có kinh nghiệm xây dựng dự án bằng Next.js, React, TypeScript, ASP.NET Core MVC và thiết kế cơ sở dữ liệu. Mong muốn tìm kiếm môi trường thực tế để đóng góp và phát triển chuyên môn.",
  email: "huynhkietzuki@gmail.com",
  github: "github.com",
  linkedin: "nguyentungduong.com",
};

const stats = [
  ["03", "năm học tập & thực hành"],
  ["03", "dự án nổi bật"],
  ["02", "chứng chỉ chuyên môn"],
];

const skills = [
  { icon: Code2, title: "Frontend", items: "HTML5, CSS3, JavaScript, ReactJS, Next.js, Tailwind CSS" },
  { icon: Layers3, title: "Backend", items: "C#, Java, ASP.NET Core MVC, SQL Server, PostgreSQL, Prisma ORM" },
  { icon: WandSparkles, title: "Tools", items: "Git, GitHub, VS Code, Postman, Figma" },
  { icon: Palette, title: "Khác", items: "Teamwork, Time Management, Gemini AI API" },
];

const projects = [
  {
    title: "Web Linh Kiện & Build PC",
    type: "E-commerce & AI",
    year: "2025-2026",
    detail:
      "Website thương mại điện tử tích hợp xác thực JWT, OTP, thanh toán và chức năng Build PC với sự tư vấn cấu hình từ Gemini AI API.",
    stack: ["Next.js", "React", "Tailwind", "PostgreSQL"],
    color: "bg-coral",
    link: "https://github.com/quangkiet1/build_PC.git",
  },
  {
    title: "Quản Lý Công Việc & Dự Án",
    type: "Task Management",
    year: "6/2026",
    detail:
      "Hệ thống quản lý tiến độ công việc, giao việc theo thời gian thực với phân quyền Admin, Leader, Member.",
    stack: ["ASP.NET Core", "SQL Server", "EF Core"],
    color: "bg-mint",
    link: "https://github.com/PhamVanPhuc2410/WEB_QUANLY_CV_NHOM.git",
  },
  {
    title: "So Sánh Điểm Excel",
    type: "Data Processing",
    year: "5/2026",
    detail:
      "Công cụ Drag & Drop tự động đọc, xử lý và so sánh tệp dữ liệu Excel lớn, hiển thị kết quả trực quan và xuất báo cáo.",
    stack: ["JavaScript", "Data Processing", "UI/UX"],
    color: "bg-brass",
    link: "https://github.com/quangkiet1/DuAnSSShiet.git",
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
      <header className="fixed left-0 top-0 z-50 w-full bg-paper/90 backdrop-blur-xl border-b border-ink/5">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-ink">
          <a href="#home" className="text-3xl font-black tracking-tight flex items-center">
            Quang<span className="text-[#f0502e]">Kiet</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex text-ink/80">
            <a className="transition hover:text-[#f0502e]" href="#home">Home</a>
            <a className="transition hover:text-[#f0502e]" href="#about">About</a>
            <a className="transition hover:text-[#f0502e]" href="#work">Portfolio</a>
            <a className="transition hover:text-[#f0502e]" href="#skills">Skills</a>
            <a className="transition hover:text-[#f0502e]" href="#contact">Contact</a>
          </div>
          <a href="/CV_Huynh_Quang_Kiet.pdf" target="_blank" aria-label="Tải CV">
            <Button className="h-10 px-6 bg-[#f0502e] hover:bg-[#d84829] text-white rounded-full text-xs font-bold transition-all uppercase tracking-wider">
              Tải CV
            </Button>
          </a>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="relative flex min-h-[90vh] pt-24 w-full items-center justify-center overflow-hidden bg-paper"
        >
          {/* Subtle Wavy Background Lines */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="#000" strokeWidth="2" d="M0,160 C320,300,420,0,720,160 C1020,320,1120,20,1440,160" />
              <path fill="none" stroke="#000" strokeWidth="2" d="M0,180 C320,320,420,20,720,180 C1020,340,1120,40,1440,180" />
              <path fill="none" stroke="#000" strokeWidth="2" d="M0,200 C320,340,420,40,720,200 C1020,360,1120,60,1440,200" />
            </svg>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-[1.3fr_0.7fr] items-center gap-16 lg:gap-8 mb-20">
            {/* Left: Typography */}
            <div className="flex flex-col justify-center text-left pt-10 lg:pt-0">
              <h1 
                data-hero
                className="flex flex-col text-ink font-sans tracking-tight"
              >
                <span className="text-[8vw] lg:text-[3.5rem] font-medium leading-[1.2] text-[#3c3c3c]">Hi, I'm {profile.name}</span>
                <span className="text-[8vw] lg:text-[3.5rem] font-medium leading-[1.2] text-[#3c3c3c]">I build premium products</span>
                <span className="text-[8vw] lg:text-[3.5rem] font-medium leading-[1.2] text-[#3c3c3c]">for</span>
                <span className="text-[9vw] lg:text-[4rem] font-bold leading-[1.15] mt-2 flex flex-wrap items-center gap-4 text-ink">
                  Website & Development 
                  <span className="hidden md:inline-block h-[2px] w-16 bg-ink/30"></span>
                </span>
              </h1>
              
              <div data-hero className="mt-12 flex items-center gap-4 text-sm font-bold tracking-widest text-ink/60 uppercase">
                <div className="h-[2px] w-10 bg-[#f0502e]"></div>
                Scroll to explore
              </div>
            </div>

            {/* Right: Circular Portrait */}
            <div data-hero className="relative flex justify-center lg:justify-end w-full">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group">
                 {/* Red wavy pattern circle behind */}
                 <div className="absolute inset-0 scale-[1.15] translate-x-4 -translate-y-4 rounded-full overflow-hidden opacity-90 transition-transform duration-700 group-hover:scale-[1.2] group-hover:rotate-6">
                    <div className="absolute inset-0 bg-white"></div>
                    <svg className="absolute inset-0 w-full h-full text-[#f0502e]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                      <defs>
                        <pattern id="red-wave" x="0" y="0" width="30" height="15" patternUnits="userSpaceOnUse">
                          <path d="M0 7.5 Q 7.5 0, 15 7.5 T 30 7.5" fill="none" stroke="currentColor" strokeWidth="4"/>
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="100%" height="100%" fill="url(#red-wave)"/>
                    </svg>
                 </div>
                 
                 {/* Main Avatar Circle */}
                 <div className="relative w-full h-full rounded-full overflow-hidden bg-[#22201c] flex items-end justify-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] z-10 transition-transform duration-500 group-hover:-translate-y-2">
                   <img 
                     src="/avatar.png" 
                     alt="Huỳnh Quang Kiệt" 
                     className="relative z-10 max-h-[92%] w-auto object-contain object-bottom drop-shadow-2xl filter contrast-[1.05]" 
                   />
                 </div>
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
                    className="font-sans tracking-tight text-2xl font-bold uppercase tracking-normal text-paper"
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
              <h2 className="mt-3 font-sans tracking-tight text-4xl font-black leading-tight sm:text-5xl">
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
                    <h3 className="mt-6 font-sans tracking-tight text-xl font-bold">
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
                <h2 className="mt-3 font-sans tracking-tight text-4xl font-black leading-tight sm:text-5xl">
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
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  className="group grid overflow-hidden rounded-md border border-ink/10 bg-paper shadow-insetLine transition duration-300 hover:-translate-y-1 hover:shadow-soft lg:grid-cols-[0.85fr_1.15fr] cursor-pointer"
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
                      <div className="h-24 rounded-md border border-ink/15 bg-paper/65 p-3 backdrop-blur transition-transform duration-500 group-hover:scale-[1.02]">
                        <div className="flex h-full items-end gap-2">
                          <div className="h-12 flex-1 rounded-sm bg-ink/80" />
                          <div className="h-20 flex-1 rounded-sm bg-paper" />
                          <div className="h-16 flex-1 rounded-sm bg-ink/35" />
                          <div className="h-24 flex-1 rounded-sm bg-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-6 sm:p-8 group-hover:bg-ink/[0.02] transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-4 text-sm font-bold uppercase tracking-normal text-ink/45">
                        <span>{project.type}</span>
                        <span>{project.year}</span>
                      </div>
                      <h3 className="mt-5 font-sans tracking-tight text-3xl font-black sm:text-4xl group-hover:text-[#f0502e] transition-colors">
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
                      <Button className="h-10 px-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" variant="ghost">
                        <ArrowUpRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </a>
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
              <h2 className="mt-3 font-sans tracking-tight text-4xl font-black leading-tight sm:text-5xl">
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
                  <div className="font-sans tracking-tight text-4xl font-black text-coral">
                    {number}
                  </div>
                  <h3 className="mt-5 font-sans tracking-tight text-xl font-bold">
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
              <h2 className="mt-3 max-w-4xl font-sans tracking-tight text-4xl font-black leading-tight sm:text-6xl">
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
