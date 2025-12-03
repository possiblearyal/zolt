import svgPaths from "./svg-2av1lo4v03";

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[10px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[10px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-0.6px] whitespace-pre">Z</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-blue-500 relative rounded-[10px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[29.163px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[29.163px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-900 top-[-0.6px] whitespace-pre">Zolt</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[73.162px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[32px] items-center relative w-[73.162px]">
        <Container />
        <Text1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute box-border content-stretch flex h-[64px] items-center left-0 pb-[0.8px] pl-[24px] pr-0 pt-0 top-0 w-[223.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pb56cd00} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3295c000} id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[39.038px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[39.038px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[20px] not-italic text-[14px] text-center text-nowrap text-slate-600 top-[-0.4px] translate-x-[-50%] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[12px] h-[37px] items-center left-0 pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[199.2px]" data-name="Button">
      <Icon />
      <Text2 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="List Item">
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_4_287)" id="Icon">
          <path d={svgPaths.p3ba229c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p1ea61200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3e4d7380} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_4_287">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[49.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[49.563px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[25px] not-italic text-[14px] text-center text-nowrap text-white top-[-0.4px] translate-x-[-50%] whitespace-pre">Rounds</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-blue-500 box-border content-stretch flex gap-[12px] h-[37px] items-center left-0 pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[199.2px]" data-name="Button">
      <Icon1 />
      <Text3 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="List Item">
      <Button1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_2_326)" id="Icon">
          <path d={svgPaths.p3dc49580} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3a62000} id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 12.75H9.0075" id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_2_326">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[66.55px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[66.55px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[33.5px] not-italic text-[14px] text-center text-nowrap text-slate-600 top-[-0.4px] translate-x-[-50%] whitespace-pre">Questions</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[37px] items-center left-0 pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[199.2px]" data-name="Button">
      <Icon2 />
      <Text4 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="List Item">
      <Button2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.pd2eb480} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p9b1580} id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p226d9800} id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p19685c00} id="Vector_4" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[43.413px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[43.413px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[22px] not-italic text-[14px] text-center text-nowrap text-slate-600 top-[-0.4px] translate-x-[-50%] whitespace-pre">Teams</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[37px] items-center left-0 pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[199.2px]" data-name="Button">
      <Icon3 />
      <Text5 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="List Item">
      <Button3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p2802f40} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p254f3200} id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[21px] relative shrink-0 w-[54.638px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[54.638px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[27.5px] not-italic text-[14px] text-center text-nowrap text-slate-600 top-[-0.4px] translate-x-[-50%] whitespace-pre">Settings</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[37px] items-center left-0 pl-[12px] pr-0 py-0 rounded-[10px] top-0 w-[199.2px]" data-name="Button">
      <Icon4 />
      <Text6 />
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="List Item">
      <Button4 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[201px] items-start left-[12px] top-[88px] w-[199.2px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-white h-[653.6px] relative shrink-0 w-[224px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[0px_0.8px_0px_0px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[653.6px] relative w-[224px]">
        <Container2 />
        <List />
      </div>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-256.8px] size-0 top-[-11.6px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="absolute bg-white border-[0.8px] border-slate-200 border-solid h-[41.6px] left-0 rounded-[10px] top-0 w-[252px]" data-name="Dropdown">
      {[...Array(3).keys()].map((_, i) => (
        <Option key={i} />
      ))}
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[13.2px] not-italic text-[16px] text-nowrap text-slate-900 top-[8.4px] whitespace-pre">Science Questions Set - 1</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[224px] size-[16px] top-[12.8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[41.6px] left-[32px] top-[10.8px] w-[252px]" data-name="Container">
      <Dropdown />
      <Icon5 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[19.2px] items-start left-[-5.4px] top-[-0.6px] w-[29.163px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-slate-900 whitespace-pre">Zolt</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[158.8px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[158.8px]">
        <Text7 />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[29.16px] not-italic text-[16px] text-slate-600 top-[-0.6px] w-[130px]">– Everest School</p>
      </div>
    </div>
  );
}

function ColorPalette() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Color Palette">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Color Palette">
          <path d={svgPaths.p364a9100} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ThemeToggle() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="ThemeToggle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <ColorPalette />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[24px] relative shrink-0 w-[10.825px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[10.825px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-0.6px] whitespace-pre">A</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-blue-500 relative rounded-[2.68435e+07px] shrink-0 size-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Text8 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[24px] h-[36px] items-center left-[632.4px] top-[13.6px] w-[278.8px]" data-name="Container">
      <Container4 />
      <ThemeToggle />
      <Container5 />
    </div>
  );
}

function TopBar() {
  return (
    <div className="absolute bg-white border-[0px_0px_0.8px] border-slate-200 border-solid h-[64px] left-0 top-0 w-[943.2px]" data-name="TopBar">
      <Container3 />
      <Container6 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[38.4px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[38.4px] left-0 not-italic text-[32px] text-nowrap text-slate-900 top-[-0.8px] tracking-[-0.64px] whitespace-pre">Quiz Rounds</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[22.4px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-0 not-italic text-[14px] text-nowrap text-slate-600 top-[0.4px] whitespace-pre">Manage, reorder, and edit all quiz rounds at a glance.</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[68.8px] relative shrink-0 w-[350.462px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[68.8px] items-start relative w-[350.462px]">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[11.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M3.75 9H14.25" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 3.75V14.25" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-blue-500 h-[41px] relative rounded-[10px] shrink-0 w-[147.025px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[41px] relative w-[147.025px]">
        <Icon6 />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[87px] not-italic text-[14px] text-center text-nowrap text-white top-[9.6px] translate-x-[-50%] whitespace-pre">Add Round</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[68.8px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Button5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon7 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[20px] text-nowrap text-slate-900 top-[-0.4px] whitespace-pre">General Knowledge</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[rgba(0,188,125,0.1)] h-[32px] left-0 rounded-[6.8px] top-0 w-[140.988px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[12px] not-italic text-[#009966] text-[16px] text-nowrap top-[3.4px] whitespace-pre">Multiple Choice</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[24px] left-[152.99px] top-[4px] w-[97.988px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[98px]">10 Questions</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute h-[24px] left-[262.98px] top-[4px] w-[9px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-400 top-[-0.6px] whitespace-pre">•</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute h-[24px] left-[283.98px] top-[4px] w-[49.675px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[50px]">5 mins</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
      <Text11 />
      <Text12 />
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start relative w-full">
        <Heading1 />
        <Container9 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_293)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_293">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon9 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[36px] opacity-0 relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center relative w-[80px]">
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function RoundCard() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[16px] h-[117.6px] items-center left-0 px-[24.8px] py-[0.8px] rounded-[16.4px] top-0 w-[864px]" data-name="RoundCard">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <Button6 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon10 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[20px] text-nowrap text-slate-900 top-[-0.4px] whitespace-pre">History Basics</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[rgba(254,154,0,0.1)] h-[32px] left-0 rounded-[6.8px] top-0 w-[103.525px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[12px] not-italic text-[#e17100] text-[16px] text-nowrap top-[3.4px] whitespace-pre">True/False</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute h-[24px] left-[115.52px] top-[4px] w-[97.713px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[98px]">15 Questions</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[24px] left-[225.24px] top-[4px] w-[9px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-400 top-[-0.6px] whitespace-pre">•</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute h-[24px] left-[246.24px] top-[4px] w-[49.075px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[50px]">7 mins</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
      <Text15 />
      <Text16 />
    </div>
  );
}

function Container13() {
  return (
    <div className="basis-0 grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start relative w-full">
        <Heading2 />
        <Container12 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_293)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_293">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[36px] opacity-0 relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center relative w-[80px]">
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function RoundCard1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[16px] h-[117.6px] items-center left-0 px-[24.8px] py-[0.8px] rounded-[16.4px] top-[133.6px] w-[864px]" data-name="RoundCard">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <Button9 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon13 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[20px] text-nowrap text-slate-900 top-[-0.4px] whitespace-pre">Visual Puzzles</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[rgba(173,70,255,0.1)] h-[32px] left-0 rounded-[6.8px] top-0 w-[69.1px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[12px] not-italic text-[#9810fa] text-[16px] text-nowrap top-[3.4px] whitespace-pre">Visual</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute h-[24px] left-[81.1px] top-[4px] w-[90.425px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[91px]">8 Questions</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute h-[24px] left-[183.52px] top-[4px] w-[9px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-400 top-[-0.6px] whitespace-pre">•</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute h-[24px] left-[204.52px] top-[4px] w-[57.375px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[58px]">10 mins</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Text17 />
      <Text18 />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Container16() {
  return (
    <div className="basis-0 grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start relative w-full">
        <Heading3 />
        <Container15 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_293)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_293">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon14 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon15 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[36px] opacity-0 relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center relative w-[80px]">
        <Button13 />
        <Button14 />
      </div>
    </div>
  );
}

function RoundCard2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[16px] h-[117.6px] items-center left-0 px-[24.8px] py-[0.8px] rounded-[16.4px] top-[267.2px] w-[864px]" data-name="RoundCard">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <Button12 />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon16 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[20px] text-nowrap text-slate-900 top-[-0.4px] whitespace-pre">{`Science & Technology`}</p>
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[rgba(0,184,219,0.1)] h-[32px] left-0 rounded-[6.8px] top-0 w-[126.55px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[12px] not-italic text-[#0092b8] text-[16px] text-nowrap top-[3.4px] whitespace-pre">Short Answer</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[24px] left-[138.55px] top-[4px] w-[97.675px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[98px]">12 Questions</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[24px] left-[248.23px] top-[4px] w-[9px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-400 top-[-0.6px] whitespace-pre">•</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[24px] left-[269.23px] top-[4px] w-[49.813px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[50px]">8 mins</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Text21 />
      <Text22 />
      <Text23 />
      <Text24 />
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start relative w-full">
        <Heading4 />
        <Container18 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_293)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_293">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon17 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon18 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[36px] opacity-0 relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center relative w-[80px]">
        <Button16 />
        <Button17 />
      </div>
    </div>
  );
}

function RoundCard3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[16px] h-[117.6px] items-center left-0 px-[24.8px] py-[0.8px] rounded-[16.4px] top-[400.8px] w-[864px]" data-name="RoundCard">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <Button15 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon19 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-0 not-italic text-[20px] text-nowrap text-slate-900 top-[-0.4px] whitespace-pre">Final Round</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute bg-[rgba(43,127,255,0.1)] h-[32px] left-0 rounded-[6.8px] top-0 w-[76.05px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[12px] not-italic text-[#155dfc] text-[16px] text-nowrap top-[3.4px] whitespace-pre">Buzzer</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[24px] left-[88.05px] top-[4px] w-[100.238px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[101px]">20 Questions</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[24px] left-[200.29px] top-[4px] w-[9px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-nowrap text-slate-400 top-[-0.6px] whitespace-pre">•</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute h-[24px] left-[221.29px] top-[4px] w-[57.1px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-600 top-[-0.6px] w-[58px]">15 mins</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <Text25 />
      <Text26 />
      <Text27 />
      <Text28 />
    </div>
  );
}

function Container22() {
  return (
    <div className="basis-0 grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start relative w-full">
        <Heading5 />
        <Container21 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_2_293)" id="Icon">
          <path d={svgPaths.p1ba32a00} id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_2_293">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon20 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon21 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[36px] opacity-0 relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[36px] items-center relative w-[80px]">
        <Button19 />
        <Button20 />
      </div>
    </div>
  );
}

function RoundCard4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[16px] h-[117.6px] items-center left-0 px-[24.8px] py-[0.8px] rounded-[16.4px] top-[534.4px] w-[864px]" data-name="RoundCard">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[16.4px]" />
      <Button18 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[652px] relative shrink-0 w-full" data-name="Container">
      <RoundCard />
      <RoundCard1 />
      <RoundCard2 />
      <RoundCard3 />
      <RoundCard4 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[864.8px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[48px] h-[864.8px] items-start pb-0 pt-[48px] px-[32px] relative w-full">
          <Container8 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[943.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pl-0 pr-[15.2px] py-0 relative rounded-[inherit] w-[943.2px]">
        <Container25 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #475569)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text29() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[43px] not-italic text-[14px] text-center text-nowrap text-slate-600 top-[-0.4px] translate-x-[-50%] whitespace-pre">Team Scores</p>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="h-[21px] relative shrink-0 w-[109.575px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[21px] items-center relative w-[109.575px]">
        <Icon22 />
        <Text29 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-slate-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[56px] items-center justify-between pb-[0.8px] pl-[32px] pr-[801.625px] pt-0 relative w-full">
          <Button21 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[24px] relative shrink-0 w-[97.425px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[97.425px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-400 top-[-0.6px] w-[98px]">#1 Dhaulagiri</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[24px] relative shrink-0 w-[20.275px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[20.275px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-blue-500 text-nowrap top-[-0.6px] whitespace-pre">40</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[77.6px] items-center left-[32px] px-[0.8px] py-[12.8px] rounded-[10px] top-[-2.8px] w-[147.025px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[24px] relative shrink-0 w-[106.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[106.25px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-400 top-[-0.6px] w-[107px]">#2 Annapurna</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[24px] relative shrink-0 w-[19.913px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[19.913px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-blue-500 text-nowrap top-[-0.6px] whitespace-pre">35</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[77.6px] items-center left-[195.02px] px-[0.8px] py-[12.8px] rounded-[10px] top-[-2.8px] w-[155.85px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[24px] relative shrink-0 w-[87.888px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[87.888px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-400 top-[-0.6px] w-[88px]">#3 Manaslu</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[24px] relative shrink-0 w-[17.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[17.438px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-blue-500 text-nowrap top-[-0.6px] whitespace-pre">10</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[77.6px] items-center left-[366.88px] px-[0.8px] py-[12.8px] rounded-[10px] top-[-2.8px] w-[140px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[24px] relative shrink-0 w-[116.25px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[116.25px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-slate-400 top-[-0.6px] w-[117px]">#4 Sagarmatha</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.738px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[9.738px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-blue-500 text-nowrap top-[-0.6px] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[77.6px] items-center left-[522.88px] px-[0.8px] py-[12.8px] rounded-[10px] top-[-2.8px] w-[165.85px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container33 />
      <Container36 />
      <Container39 />
    </div>
  );
}

function TeamBar() {
  return (
    <div className="bg-white h-[128px] relative shrink-0 w-[943.2px]" data-name="TeamBar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[128px] items-start overflow-clip relative rounded-[inherit] w-[943.2px]">
        <Container27 />
        <Container40 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px_0px_0px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function ManageRounds() {
  return (
    <div className="content-stretch flex flex-col gap-[0.8px] h-[653.6px] items-start relative shrink-0 w-full" data-name="ManageRounds">
      <Container26 />
      <TeamBar />
    </div>
  );
}

function MainContent() {
  return (
    <div className="absolute content-stretch flex flex-col h-[589.6px] items-start left-0 overflow-clip top-[64px] w-[943.2px]" data-name="Main Content">
      <ManageRounds />
    </div>
  );
}

function Container41() {
  return (
    <div className="basis-0 grow h-[653.6px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[653.6px] relative w-full">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
}

export default function QuizCompetitionManagementSystem() {
  return (
    <div className="bg-slate-50 relative size-full" data-name="Quiz Competition Management System">
      <div className="size-full">
        <div className="content-stretch flex items-start relative size-full">
          <Sidebar />
          <Container41 />
        </div>
      </div>
    </div>
  );
}