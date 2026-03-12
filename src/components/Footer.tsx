export default function Footer() {
  return (
    <footer className="mt-20 bg-black text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20">
        
        {/* Header Section */}
        <div className="flex items-end gap-6 mb-12">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold tracking-wider text-neutral-200">联系我</h2>
            <span className="text-[10px] tracking-[0.4em] text-neutral-500 mt-2 uppercase font-medium">Contact Me</span>
          </div>
          <div className="h-px bg-white/10 flex-1 mb-2.5" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          {/* QR Code Placeholder */}
          <div className="w-36 h-36 bg-white p-2 rounded-md shrink-0">
             <div className="w-full h-full border-2 border-black flex items-center justify-center relative">
               {/* Simulating QR corners */}
               <div className="absolute top-1 left-1 w-6 h-6 border-2 border-black" />
               <div className="absolute top-1 right-1 w-6 h-6 border-2 border-black" />
               <div className="absolute bottom-1 left-1 w-6 h-6 border-2 border-black" />
               {/* Icon */}
               <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white text-[10px] font-bold">
                 WeChat
               </div>
             </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-5 pt-4 text-sm text-neutral-500">
            <div className="flex items-center gap-3">
              <span className="tracking-wide">电话:</span>
              <span className="text-neutral-300 font-mono tracking-wide">13416347673</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="tracking-wide">邮箱:</span>
              <span className="text-neutral-300 font-mono tracking-wide">493866989@qq.com</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} Zesen. All Rights Reserved.</span>
          <span className="tracking-widest">设计 · 交互 · 前端</span>
        </div>
      </div>
    </footer>
  );
}
