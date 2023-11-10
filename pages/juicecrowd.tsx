import { BooleanParam, useQueryParam, withDefault } from "next-query-params";
import PostCards, { PostCard } from "../components/PostCards";
import SiteNav from "../components/SiteNav";
import ProjectDetail from "../components/ProjectDetail";
import { useState } from "react";

export default function JuiceCrowd() {
  const [sortEnabled, setSortEnabled] = useQueryParam(
    "sortEnabled",
    withDefault(BooleanParam, false),
  );
  const [selectedProject, setSelectedProject] = useState();

  const posts = projectsToPosts(projects, (p) => setSelectedProject(p));
  if (sortEnabled) {
    posts.sort((a, b) => b.cost - a.cost);
  }
  const totalProject = posts.length;
  const totalUsd = posts.map((p) => p?.cost ?? 0).reduce((a, b) => a + b, 0);

  return (
    <>
      <SiteNav
        pageTitle="JuiceCrowd projects"
        description="Projects submitted on JuiceCrowd"
        image="/images/banny_tutorial.png"
      />
      <div className="relative bg-gray-50 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Projects submitted on JuiceCrowd
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              <span className="font-semibold">{totalProject} projects</span>
            </p>
            <p className="mx-auto max-w-2xl text-xl text-gray-500">
              <span className="font-semibold">
                {formatNumber(totalUsd)} usd
              </span>{" "}
              requesting by projects.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setSortEnabled(!sortEnabled)}
              className="relative inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              {sortEnabled ? "Sort by time" : "Sort by spending"}
            </button>
          </div>

          <PostCards posts={posts} />

          <ProjectDetail
            open={!!selectedProject}
            project={selectedProject}
            setOpen={(o) => {
              if (!o) {
                setSelectedProject(null);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

const formatter = new Intl.NumberFormat("en-GB", { style: "decimal" });
const formatNumber = (num) => formatter.format(num);

function projectsToPosts(projects, onClick): PostCard[] {
  return projects.map((project) => {
    return {
      title: project["Project title"],
      href: project["Official link"],
      onClick: () => onClick(project),
      category: {
        name: project["Web3 & blockchain"] === "Yes" ? "Web3" : "-",
        href: "#",
      },
      description: project["Tagline"],
      date: "-",
      datetime: "-",
      imageUrl: project["Project logo"],
      author: {
        name: project["Owner name"],
        href: "#",
        imageUrl: "https://cdn.stamp.fyi/avatar/anon?s=160",
      },
      cost: project["How much do you need to raise (in US dollars)?"],
    };
  });
}

const projects = [
  {
    "Owner name": "Sutu",
    "Project title": "EyeJack X",
    "Official link": "https://eyejack.xyz/",
    Tagline:
      "An online tool to create and distribute 3D interactive XR content",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Our team at EyeJack X is building a WebXR platform that consists of an online 3D editor that is powered by easy-to-use templates that enable digital creators to easily create XR content without needing to know how to code. Our XR format is built using web tech, that allows the content to be experienced on desktop, in AR and VR, and minted as an NFT.  It will be a first-of-its-kind fully interoperable XR NFT format. It is compatible with mobile devices and the latest headsets including Quest 3 and Apple's upcoming Vision Pro.",
    "How much do you need to raise (in US dollars)?": 300_000,
    "What will the funds be used for?":
      "The funds will be used for further development including: integrating the tools with existing NFT marketplaces on multiple blockchains, developing new XR templates, and establishing a licensing and distribution network that allows XR art to be licensed to events, galleries, and institutions globally, thus providing a secondary stream of revenue for creators and the platform.",
    "What progress have you made?":
      "We have spent the last year building the following:  3D WebXR editor: Our no-code web app allows users to choose from a collection of boiler templates to create immersive experiences easily.  XR Viewer: currently allows users to experience XR content across any platform (AR, VR, web browser).  XR Catalog: We have over 10,000 creators on our existing EyeJack platform and have licensed works to over 20 countries. We are in the process of migrating these creators over to our new EyeJack X platform, and are establishing a database of potential vendors and licensees.   We have currently raised $300k in our pre-seed round.   We have curated three XR exhibitions, featuring the works of over 50 artists. The first exhibition will be launching at Art Basel in December 2023 in collaboration with Tezos and Refraction DAO.",
    "Why are you the right person to make this project?":
      "Over the last decade I have created XR experiences for popular IP including Doctor Strange, Spider-Man and Ready Player One and musicians including The Weeknd, John Legend, Jean Michel-Jarre, deadmau5 and Dylan Francis. My personal immersive projects have been shown at Tribeca, Sundance, Venice and SXSW Festivals. I hold a doctorate of Digital Media and am regarded as a thought leader in the space, having contributed to multiple publications and spoke at prestigious events such as Ted.  I am also the Co-Founder of EyeJack an Art and Tech company. We operate as both a commercial design studio and a software development company. We have developed the Web2 EyeJack Creator platform that is home to over 10000 creators, and we have successfully created our own generative art software for creating the successful Neonz 10k PFP project. We have a collective 20+ years of experience working in XR and have rolled our aggregated knowledge into building the best-in-class WebXR platform that will enable XR content to publish at scale with the ability to track payments and royalties using Blockchain principles. Considering our past client work with companies such as Verizon, Sony, Hermes and Marvel, as well as our own IP development, including Prosthetic Reality (an AR exhibition featuring over 50 world-class digital artists and hosted in 14 countries), we have the confidence, relationships and technical experience to be the best-positioned company to succeed in this convergent world of cutting-edge technologies.",
    "Project logo":
      "https://api.typeform.com/responses/files/a70f6451d1c3d6019ab7277de20fded8a657ffedd3a2caab7b5a3f476b56e399/EJX_logo_black_2048__1___2_.png",
    "Video or image":
      "https://www.veed.io/embed/b202aab6-dd90-4b25-ba84-86e4f6f5789b",
  },
  {
    "Owner name": "Jared",
    "Project title": "My Democracy",
    "Official link": "https://mydemocracy.app/",
    Tagline:
      "My Democracy is a web3 AI platform designed to revolutionize civic engagement.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I am creating My Democracy, a platform that harnesses AI to help constituents effortlessly communicate with their elected representatives. It guides users in drafting impactful messages and, as a bonus for engaging, grants them an NFT that opens the doors to a community of activists with shared concerns. This not only fosters individual voices but also strengthens collective advocacy through grassroots networking.",
    "How much do you need to raise (in US dollars)?": 10_000,
    "What will the funds be used for?":
      "The funds will be utilized to advance the development of the My Democracy platform and its technological infrastructure. This includes refining our AI capabilities for message crafting and improving the integration of NFTs for community engagement. It's important to note that the figures provided are rough estimates; a detailed quote is necessary for precise budgeting.",
    "What progress have you made?":
      "We have successfully developed the minimum viable product (MVP), which is accessible at mydemocracy.app. This platform is currently positioned to undergo its first significant test in a real-world application. We're in discussion with the NV Chapter of the NAACP to utilize the platform for an upcoming letter-writing campaign. This initiative will serve as a crucial test of our platform's functionality and its impact on civic engagement.  On the organizational side, we're laying down the foundation of our team. We have preliminary commitments from five experienced individuals who have expressed interest in joining our board. Their diverse expertise is expected to drive the strategic direction and governance of the platform as we scale. This early momentum is a testament to the platform's potential and the need for innovative solutions in the civic technology space.",
    "Why are you the right person to make this project?":
      "ChatGPT  I'm Jared Busker, and I've spent the last fifteen years navigating the complex waters of lobbying, political campaigns, issue advocacy, and technical assistance. My career has taken me through the inner workings of state and federal legislative processes, and I've developed a knack for uniting communities around common causes and leveraging technology to amplify our voice in democracy.  One of the unique aspects of my work is exploring the intersection of politics with emerging technologies like Web3 and NFTs. Not many in the advocacy space are diving into how these innovations can reshape our approach to civic engagement, but I believe there's huge potential here.  My experience is broad and diverse—I've helped families across 24 states engage with Congress and provided non-profits in thirty states with the tools they need to drive their advocacy efforts. Serving as a Senior State Advocacy Specialist at ZERO TO THREE equipped me with invaluable insights, and my tenure as the Interim Executive Director at the Children’s Advocacy Alliance was a master class in campaign management and strategic planning.  My academic background in Economics and Urban Leadership has provided a strong foundation for understanding the systemic challenges we face and envisioning the solutions we need. At the heart of my work with My Democracy is the belief that we need to harness the power of technology to create a more responsive and dynamic political environment. That's where true change begins.",
    "Project logo":
      "https://api.typeform.com/responses/files/acc88bc54d3c69bbdc3c92eaf6ab1275cb54c0d44beb63bde8de301c0e45a66b/My_Democracy_Logo.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/8bdf6be950dada8cfa94e46f04ce6eb3a0b88df60ec867a16e7feade6b233804/Screenshot_2023_11_08_at_8.09.18_PM.png",
  },
  {
    "Owner name": "Hoang Nguyen",
    "Project title": "Buidler",
    "Official link": "https://buidler.app/",
    Tagline: "Buidler is a web annotation built on top of Farcaster.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "It is a browser extension that allows you to create discussions or reviews on any webpage and see others on Farcaster who have interacted with it.",
    "How much do you need to raise (in US dollars)?": 150_000,
    "What will the funds be used for?": "Development Cost and marketing",
    "What progress have you made?":
      "We have launched the beta version and are continuing to develop the user base.",
    "Why are you the right person to make this project?":
      "I'm obsessed with finding out what people are saying about a URL when they are browsing it, and I've been exploring various ways to execute this idea. Farcaster seems to be the missing puzzle piece I've been looking for.",
    "Project logo":
      "https://api.typeform.com/responses/files/acec156daa0a621651d1e49b2118d366ad69641a9f194a3c47864389e9d22428/Square_logo_icon._light_BG2.png",
    "Video or image": "https://vimeo.com/830908636?share=copy",
  },
  {
    "Owner name": "Claire",
    "Project title": "Of Two Minds",
    "Official link": "https://www.instagram.com/claire_jervert/",
    Tagline:
      "I am creating a Collaborative AI immersive experience artwork including interactions with a non-human cognitive agent to develop a hybrid intelligence through computational modeling.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Of Two Minds is the first Collaborative AI artwork to create an intimate conversational immersive experience using a cognitive hybrid model that responds extemporaneously and in real-time, which simultaneously contributes to the avatar’s ability to engage in evermore complex and nuanced dialogues.",
    "How much do you need to raise (in US dollars)?": 5_000,
    "What will the funds be used for?":
      "Finishing fund to put optimize and refine final build and purchase updated equiptment.",
    "What progress have you made?":
      "I have raised in-kind expertise and $6,000 from various supporters. The work is finished as a Unity project. The team includes myself, a creative technologist, an experience AI developer, a point cloud technician. The work will be shown in its basic state at an event at Lincoln Center NYC in mid 2023.",
    "Why are you the right person to make this project?":
      "I have been working in tech and art since 2002--this project since 2014. I have already created the project and have plans for further plans to create various iterations of this project, which was essential to winning the MIT XR Hackathon this year. claire_jervert (instagram)",
    "Project logo":
      "https://api.typeform.com/responses/files/74986366a8cdb6cbe252231b15e9e839e10d9c9e301467f2592950c1c8760382/Artizen.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/f6d6544c24991a636423bb240aa0aa231dcfb71125084726743192da6901f803/Bina_on_Life_Clip.3gp",
  },
  {
    "Owner name": "Malik",
    "Project title": "huff-ast",
    "Official link": "https://github.com/malik672",
    Tagline: "huff ast written in rust",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Phind The project is focused on creating an Abstract Syntax Tree (AST) representation for Huff code in the Rust programming language. An AST is a data structure that represents the structure of a program in a hierarchical manner, capturing the relationships between different elements of the code.  The goal of the project is to provide a way to parse Huff code and generate an AST that can be used for various purposes, such as compression, decompression, and analysis of Huff-encoded data. The AST representation allows developers to analyze and manipulate Huff code in a structured and programmatic way.",
    "How much do you need to raise (in US dollars)?": 1_500,
    "What will the funds be used for?":
      "for tooling, testing and most importantly development cost",
    "What progress have you made?":
      "i've put together the team but i've raised no money",
    "Why are you the right person to make this project?":
      "well i know about huff and currently there's no huff ast present, so i want to build one",
    "Project logo":
      "https://api.typeform.com/responses/files/562160e91b85f7fc219db0e720c1faa021186e8f5242ea1d11dadfff959f4b3d/Screenshot_from_2023_11_08_17_47_36.png",
    "Video or image":
      "https://api.typeform.com/responses/files/3e90a16ff11961e55b9ab1a8e5009ddf4a562e01b3919a227bc7f83dd2230fd9/Screenshot_from_2023_11_08_17_47_36.png",
  },
  {
    "Owner name": "Kushagra",
    "Project title": "Minato",
    "Official link": "https://tanukiverse.com/",
    Tagline:
      "explorative adventure game about the quest of a young girl exploring the magical world of the yokai, unleashing the power within",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      'Tanukiverse, is a foremost network state IP brand that embodies Japan\'s ancient culture and traditions, passionately preserving them through captivating yokai tales and generational storytelling of the iconic folkloric character, Tanuki.   Under the IP, we are building a game called "Minato" which is going to be a 2D platform game unfolding the story of Tanukiverse. The idea is to scale he IP via a game so that the character becomes more lovable and relatable to the masses.   We are building this game that encompasses the aesthetics of Japanese Yokai world, Tanuki tales and rebuilding neo-folklore form of storytelling.',
    "How much do you need to raise (in US dollars)?": 200_000,
    "What will the funds be used for?":
      "Concept design, System Design & Loop, Game development, Marketting and PR, Distribution, events and tournaments",
    "What progress have you made?":
      "we have concocted up a strong supportive community  through the sale of 700 genesis NFTs and raising close to 50K usd, with 0 dilution of equity.   We have assembled a capable team to work on this project and are already in advanced talks with some blockchains to build this project along with them and acquire a grant.   We also have closed partnerships on several fronts with businesses and firms who will help us develop this IP and market it to the people. some of those partnerships being :  1. Merch partnership with The Souled Store 2. Beer launch partnership with Yamanashi prefecture 3. Strategic partnership with Shibuya-Ku city",
    "Why are you the right person to make this project?":
      "I have worked in the Japanese anime industry for the past 6 years on almost 30 titles such as JoJo, Yugioh, Danmachi, Edens zero, Lycorise coil, Vinland Saga and many more. Apart from that i have gained formidable amount of experience in the web3 space such by being the advisor for 0n1 force and Yama World. In addition to that, i am also an artist in residence on the Avalanche ecosystem, while i gradually transition into a role of creative director in web3 for Konami (in talks)  Having understood the Japanese market and the users in the web3 space, and boasting a network of people who can help me build this project, i am sure i can build this IP and take it to great heights because of being one of the only Indians ever to have organically worked in the anime space in Japan.   I am also founding team member at Metasky, which is backed by Sequoia Capital and Woodstock fund.",
    "Project logo":
      "https://api.typeform.com/responses/files/f0c925822e53c8537074dcb26632aa2f40965703ea763b0e153450d55173825a/minato_typeface.png",
    "Video or image":
      "https://api.typeform.com/responses/files/c884390d9bd32ee5a8e5559c4463edffb4eec5735668c16333b2eefae1053425/minato_teaser_.mp4",
  },
  {
    "Owner name": "Judit",
    "Project title": "Szívküldi Lakótelep - a compossible VR neighborhood",
    "Official link": "https://www.juditnavratil.com/works",
    Tagline:
      "The Szívküldi Lakótelep (szívküldi= heart-sent, lakótelep=social housing neighborhood) is a multi-layered virtual reality art project that considers the possibilities and dangers of ‘home’ and collective phygital care in cyberspace.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I've been growing the Szívküldi Lakótelep (szívküldi= heart-sent, lakótelep=social housing neighborhood), a multi-layered virtual reality art piece since 2018 with the aims expand human connection and help each other moving into and growing roots in cyberspace. The form is based on my upbringing in a comfort flat on the 8th floor in the late communist era of Hungary and shaped by the experiences of being flown on large kites. I have moved between several different countries and cultures, and as an immigrant, I’ve relied on digital means to connect to people and places in an attempt to construct “home,” long before the pandemic. My projects are affective mappings of what it means to continuously oscillate in-between analogue and digital yet being fully present and holding space for phygital care. I develop #memoryconnectors by observing topophilia and translating these energies into the Metaverse.                                                                                         One area of this neighborhood is VR Art Camp, a social VR art residency program that scaffolds womxn and underserved artists to explore digital belonging and the possibilities of creating and inhabiting a virtual communal place with care. VR Art Camp is a bridge for those, whose practice is not rooted in digital media and for a diverse community with different voices and approaches, as it is accessible both on a browser and in virtual reality.                                                                                                                                                                                                                                  I'm offering the energy of LDS Long Distance Somersaults through the VR neighborhood in the form of LDS NFTs to raise funds for our social VR and IRL gatherings lifting each other up; considering 'home' and collective phygital care in cyberspace.",
    "How much do you need to raise (in US dollars)?": 10_000,
    "What will the funds be used for?":
      "Further development, marketing, open call and new paid art residencies (Alternative Exposure Grant financed our programming in 2023), IRL gatherings",
    "What progress have you made?":
      "In my artistic research as a Ph.D. candidate at the Applied Art University Vienna, I started to summarize and journal these experiences and the learning curve of developing this VR neighborhood that also includes a social VR art residency program that I founded in 2020. My study excavates the potential of cyber topophilia by reflecting on my personal case of growing up in the late communism of Hungary, being privileged to move abroad to South Korea, California, and British Columbia, and the attempts to plant seeds of love in the void of VR as a compass for my homesick heart. I dedicate this work to support the development of post-pandemic pedagogical tools for the new generations to inhabit and shape the Metta-verse* with good intentions and care.   I received the Alternative Exposure Grant $4500 that financed VR Art Camp’s programming in 2023: I made an open call and paid 9 artists to create their social VR spaces. I organized our 2nd IRL Art Camp in Bodega Dunes Campground, where I offered 35 campsites for participants to gather and we co-created a weekend with participatory performances, unconventional mediations, flying and making kites and hikes.   My proposal was accepted for an exhibition of this work and our artists at the Root Division Gallery, San Francisco in January 2025.",
    "Why are you the right person to make this project?":
      "As a mother in a multi-racial family and a first generation immigrant, I understand the void of the metaverse on a somatic level and feel the urge to empower the sense of community. All my attempts are rooted in sharing the unconditional, Grandmother Love that I am honored and privileged to carry in my heart. With my international and intergenerational background, I am confident in holding space for phygital care (literally, as of holding and flying the Tent that becomes a Blob that is a center of our gatherings) and elevating our virtual experiences. My ludic practices help the embodied and psychological flexibility to gaze in the Eye of the Hurricane together.",
    "Project logo":
      "https://api.typeform.com/responses/files/1f1288dee6495ba85c19307ae4cdb84086ff62cfcc47365d6c775cbfbab922a1/Untitled_218_11.png",
    "Video or image":
      "https://api.typeform.com/responses/files/346704d31ee7b5c03d939792e142adcb5ab09e40026b611ceb53fffa0b99db6d/Untitled_218_05.mp4",
  },
  {
    "Owner name": "Julie",
    "Project title": "Blu3 Africa",
    "Official link": "https://blu3africa.xyz/",
    Tagline:
      "We onboard and educate African women into web3 and Blockchain careers.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm building a project that allows African women developers to receive training and mentorship in blockchain and web3.",
    "How much do you need to raise (in US dollars)?": 8_000,
    "What will the funds be used for?":
      "Further development, hackathons, workshops, IRL events.",
    "What progress have you made?":
      "We have hosted several Solidity workshops, sent our teams to three hackathons, and graduated 25 women developers from our workshops. We have a small team of dedicated volunteers working to help build the community.",
    "Why are you the right person to make this project?":
      "I have been working in the web3 ecosystem in marketing, as well as planning and coordinating web3 workshops and events for the last couple of years.",
    "Project logo":
      "https://api.typeform.com/responses/files/658cac6792ae93df3f52e8e90908e0cb59a9a1ce6458078b0aaf57bdbbe2327d/Asset_Blu3_Africa.png",
    "Video or image":
      "https://api.typeform.com/responses/files/90515a289347d61ac258256eb63e9159c4b9703bf7a3ead97ba8e47cf4d5c338/Blu3_Africa.png",
  },
  {
    "Owner name": "Stepan",
    "Project title": "TicTac",
    "Official link": "https://primum.my.canva.site/tictac",
    Tagline:
      "Me and lunar exploration company Ispace are sending banners written in alien languages from cult movies like Star Wars and Star Trek to the Moon!",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Tictac’s art project aim is to send Alien Banners to the moon together with Ispace Lunar exploration company. Those banners would be put on a moon lander and the picture would be taken of it from a rover on the moon. Banners are written in alien languages from Star Wars, Futurama, Predator, Star Trek, Star Gate and Superman's Kryptonian Languages in different colours. There would be 2 more banners ready within few days. Those banner illustrations would be sold as NFTs. The Idea behind is to fight against any form of discrimination and alienation in society and taking fun about UFO and the first ad banners for aliens on the moon. It would be the size of plaque or a a small sticker will weight 5-8 grams. The cost per gram is $1500. Planned to launch in 2024/25 through SpaceX rocket.",
    "How much do you need to raise (in US dollars)?": 15_000,
    "What will the funds be used for?":
      "It would be production (the cost of payload of 5-8grams)  and further marketing",
    "What progress have you made?":
      "I have reached out a moon space company Ispace, contacted and discussed with them my project, they have agreed. I have created 7 banners in alien languages and 2 more to finish in those 2-3 days. Basically all is ready, just have to pay for the payload, stick the plaque with those banners to the lander and find out the exact date of the nearest launch of Ispace and SpaceX as date may differ from weather and other things. Everything is ready.",
    "Why are you the right person to make this project?":
      "I am an international artist, I have my art being shown at major art magazines, art galleries and International Art Fairs. I did my BA and MA in Fine Art at major UK universities and Institutions. I have created this idea which is BOLD, FUN, UFO and REAL. Every time I look at the moon now I visualise this project and want to make it because it will change my art career to the next level. I am definitely the person responsible for that and the most motivated to make it. At the same time I can and know how work in a team to make things working.",
    "Project logo":
      "https://api.typeform.com/responses/files/0f73bbdd9c3e5ae67e5e43d4d2c8b5fbd814385ffcf70ae08d34c2d509feffe1/Back_it.png",
    "Video or image":
      "https://api.typeform.com/responses/files/9af495ba5f112bc3b0074508f5ac75f2b56097965f8cb87be18adf9240af20cf/Back_it.mp4",
  },
  {
    "Owner name": "Arath Lambe",
    "Project title": "Dream DAO",
    "Official link": "https://www.dreamdao.xyz",
    Tagline: "Empowering GenZ to build a brighter future with web3.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I believe that one of the best investments in humanity is Gen Z (the builders of the future) and, within Gen Z, I believe the highest leverage opportunity to realize their potential is to teach them how to leverage the most powerful emerging technology: web3. I, along with a team of passionate young builders consider web3’s ability to impact the world positively depends on the web3 builder community collectively looking a lot more like how the world looks and is more driven by social impact purpose. This is where Dream DAO comes in. Members, with the help of boot camps, web3 tech and working groups will go on to build world-changing DAOs, create web3 x social impact projects that make unprecedented progress on entrenched social issues, and become moral and tech-savvy leaders of their respective industries. I work to create an educational portal for young people to explore the web3 field and specialize in something specific as they explore other communities through funding and networking. TLDR; I'm building a DAO that empowers youth to learn web3 and use it for social impact and contribute to other web3 communities.",
    "How much do you need to raise (in US dollars)?": 50_000,
    "What will the funds be used for?":
      "1. Funding for our youth to attend different events, such as hackathons and meetups around the world. We plan on visiting at least two international events and four local ones per year, bringing at least 5-7 builders to create projects and connect with like-minded individuals. This is what takes most of the funds but it's pretty important as this serves as marketing for us given we attract attention by bringing young people in spaces mostly attended by adults. 2. Our operations: Compensation systems for high-end tasks and funding allocation for internal DAO projects. 3. Social media marketing strategies and builder bounty/drops.",
    "What progress have you made?":
      "Raised over 200,000 USD in the last two years of operations.  Brought over 100 builders around the world to web3 spaces.  Hosted 80+ Learning Together sessions for our community with leaders in the space.  Funded 20+ builders to attend NFT NYC, Web3Conf Goa, ETHMexico, and Devcon VI, with our community winning 3 awards in the ETHMexico hackathon. (Best Use of Public Goods for MeritDAOcracy, Best Use of UX for OwnTheLand, Finalist for Staxx).  Partnered with Organizations like Celo’s Climate Collective, AERA Force, Protein and dOrg to host over 15 Dream DAO builders to intern in their organizations, giving them their first working experience and an additional stipend to leverage their studies and lives.",
    "Why are you the right person to make this project?":
      "Over the past years, I've been involved in leadership programs such as Rise For The World (Schmidt Futures) where my initiatives got me a finalist spot and the opportunity to build bigger things with the right connections and the right strategies. The exposure with different leadership initiatives took me to Civics Unplugged, where I met what today is the Dream DAO team, always looking for the best in our society. I have the social impact spirit on me, always wanting to create good from ashes and darkness, always persevering. However, I can't make this alone, I need a team of individuals sharing the same passion and with different specialties to achieve diversity and build the best pathways for our project.",
    "Project logo":
      "https://api.typeform.com/responses/files/fd289dc673f4083425443fd8e092a7be404b2d8a1e79aa89bb7d4df99588613c/626ede36184317a8e1b28c6b_Dream_DAO_Earth_Logo__1__1.png",
    "Video or image":
      "https://api.typeform.com/responses/files/42cb362e043316e028e8fcd775401c324a71db64f5f6ad1bded45fd4ba236e97/3ef66c42_b96b_4d98_b8d6_02950f27baab.mp4",
  },
  {
    "Owner name": "Wadooah",
    "Project title": "When Brooklyn Was Queer'",
    "Official link": "https://www.instagram.com/whenbkwasqueer_xr/",
    Tagline:
      "Step into real, untold history of Brooklyn's vibrant queer community at the turn-of-the-century in immersive XR.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "We're adapting the amazingly, groundbreaking book from Hugh Ryan, 'When Brooklyn Was Queer,' into an immersive, narrative, XR experience. (https://www.nytimes.com/2019/04/20/books/review/hugh-ryan-when-brooklyn-was-queer.html )",
    "How much do you need to raise (in US dollars)?": 25_000,
    "What will the funds be used for?":
      "Funds will be used for development, marketing & community building to prep for production & post production of the pilot for our VR series..",
    "What progress have you made?":
      "We've assembled an impressive team across New Canvas, MA Productions and (Elliot Page’s) Page Boy Productions who will bring this story to life creatively and authentically, in addition to an incredibly savvy, award-winning, female, XR director and an award-winning, transgender writer that we will announce all soon!",
    "Why are you the right person to make this project?":
      "Meet me! – A Black, award-winning, LGBTQ+ dynamo with 20+ yrs of media magic under my belt who is DEEPLY connected to the heartbeat of our subject matter & am a true believer in the power of story! 🏆🌈 I live for creating entertaining content that educates, inspires & makes us feel something.",
    "Project logo":
      "https://api.typeform.com/responses/files/0852c57262a9f644157ab820ae40923c42943ace23b4a6dce89b937bd1314d6e/WBWQ_Art6.png",
    "Video or image":
      "https://api.typeform.com/responses/files/793fb85eb86ca20b25962deaec1b261c0dc9ddc1d00f5e69ab3011b8a5627ae1/_When_Brooklyn_Was_Queer____Video_Artifact_2.mp4",
  },
  {
    "Owner name": "Tea",
    "Project title": "Tape Dealers",
    "Official link": "https://www.instagram.com/schwesternsisters/",
    Tagline:
      "You are a Rock Star looking to collect rare tapes from the starving artist, and shoot some zombie pigeons on the way.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm making a multimedia universe called Schwestern Sisters - the teenage apocalyptic space saga. I wish to incorporate an on-chain album release by it's protagonists.",
    "How much do you need to raise (in US dollars)?": 10_000,
    "What will the funds be used for?":
      "To distribute money to musicians involved and find developers to help with adjusting my 3D characters and writing for on chain use.",
    "What progress have you made?":
      "Formed an exceptional team of groundbreaking musicians. Funded the crafting of the web-based story arc ( releasing chapter 7 soon). Designed game ready 3D characters. Created a 2D animated cinematic. Produced 3D printed game models.",
    "Why are you the right person to make this project?":
      "For the past ten years, I've immersed myself in a unique underground community, where I had the privilege of meeting some of the most incredible individuals. Inspired by Gorillas and GTA, I want to create a way to get my friends payed and heard.",
    "Project logo":
      "https://api.typeform.com/responses/files/47ad2e9af8a358456c686aae4022876a96a55a821dbfc45fbff4003014c66a5b/Group_1.png",
    "Video or image":
      "https://api.typeform.com/responses/files/3dca0a51300d443b8f898400b017ca33aaadbac3e6f4e9b9959eff68f6d33543/Schwestern_Sister___wip___trailer__.mp4",
  },
  {
    "Owner name": "Eduardo",
    "Project title": "The Ents of The Forest",
    "Official link": "https://lotr.fandom.com/wiki/Ents",
    Tagline:
      "I want to build a token based on real state on the amazon forest, you will own preserved land by acquiring the token.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Basically i will create a company, do a pre-sale and buy forest land to help preserve the forest. It's pretty straight forward.",
    "How much do you need to raise (in US dollars)?": 100_000,
    "What will the funds be used for?":
      "Hire a legal team here in Brazil, create the tokens, marketing and infrastructure.",
    "What progress have you made?":
      "At the moment i did a lot of research on the matter, talked to a couple of NGR's and matured the idea.",
    "Why are you the right person to make this project?":
      "I have a background with NGO's and a will to do something that matters.",
    "Project logo":
      "https://api.typeform.com/responses/files/7d070f8a6fef9214d49fe4803b5150e0005d64901e7eaa5f312620ec1c3590ee/ents.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/daaf952a6aae13fc9df4123cefcf0ffec0cc442221aecefbfa66eaaaf5dc2837/ents.jpg",
  },
  {
    "Owner name": "Nitanshu",
    "Project title": "sherLOCKED",
    "Official link": "https://github.com/nlok5923/SherLOCKED",
    Tagline:
      "An FHE based privacy enabling infrastructure for EVM blockchains.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      'Everything on blockchain is public by design. Once a transaction is added to the blockchain, it becomes visible to anyone who wishes to see it. Though it caters to the core decentralised nature of the blockchain, it also open multiple scenarios of information getting snooped. Some of them are:  Wallet Spying - Since whatever values an account holds is visible on the block explorer. Anyone can analyse the wallets about the activity, which might not be desirable for every account holder like institutional investors, or some account owners who doesn’t wishes to disclose its amount.  MEV Extraction - Searchers could see the transaction data and can leverage those information to extract MEV out of user\'s transactions. Which leads to user getting bad prices.  Scam Attacks - Dusting attacks is a perfect example, where an attacker sends small amounts of cryptocurrency to a large number of public addresses. Since all transactions are publicly recorded, the attacker can then track the movement of these "dusted" funds and try to identify patterns or clusters of addresses that belong to a single entity. Armed with this information, the attacker could engage in more targeted phishing attempts or other types of fraud.  On all the above issues, the core problem is the public visibility of the data on the blockchain. I am building sherLOCKED which is a full scale developer friendly infrastructure to encrypt this public transaction data, so anyone trying to snoop on the data is unable to make sense out of it as the data on the blockchain would be avalaible in the encrypted manner.  SherLOCKED is a full fledged infrastructure developed from scratch which devs can use to write their custom smart contracts capable of operating on encrypted data over the blockchain.  When the user sends the transaction to the smart contract, before calling the function on chain, it is first encrypted by the network of nodes which uses MPC to encrypt data and the encrypted comes to the SDK.  SDK then calls the smart contract function with encrypted data as function parameters. Thus the smart contract operates on the encrypted data. As now encrypted data get passed into function parameters so the data visible onchain is itself a cipher.  Computation on the encrypted data is gas heavy, therefore it is outsourced to zkVM based RISC0 proof computer (Bonsai) which computes and provide the proofs to ensure that the operations performed are legit. The proof is then verified by the relayer deployed on the EVM chain and then finally states updated.  On chain every computation happened in encrypted domain, the user can decrypt the data later with the help of MPC based decryptor, after proving the ownership of data.',
    "How much do you need to raise (in US dollars)?": 15_000,
    "What will the funds be used for?":
      "Funds would mostly going to be used for development and other infrastructure operation cost.",
    "What progress have you made?":
      "We had shipped the v0 of the infrastructure during ethonline'23 hackathon for which we become the finalist.  Submission: https://ethglobal.com/showcase/sherlocked-0ux91",
    "Why are you the right person to make this project?":
      "Exploring the FHE space. Previously built and shipped our own Account abstracted wallet sdk which uses passkeys as an owner. Contributed th building blockchain (zus network) Selected in Polygon Fellowship and Ethereum India Fellowship",
    "Project logo":
      "https://api.typeform.com/responses/files/171fd26ed0d2931664821e80e0e79ab4b89f0da571c79d7460d94b80e32854d1/Infra_for_seamless_and_secure_user_onboarding_1.png",
    "Video or image":
      "https://api.typeform.com/responses/files/dcbb62deacb3b69733771bc7e91812d5611bdf62f59d0a8ff3f89b22afe66afb/Screenshot_2023_10_22_at_3.59.26_PM.jpg",
  },
  {
    "Owner name": "Jo",
    "Project title": "EncompassWell",
    "Official link": "https://twitter.com/EncompassWell",
    Tagline:
      "A holistic health and wellness sanctuary guiding individuals and communities.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm building a holistic health & wellness platform that seamlessly integrates one-on-one coaching and the profound wisdom of oracle readings with intricate insights of astrology, offering weekly sessions to guide individuals and communities towards self-exploration & balance.",
    "How much do you need to raise (in US dollars)?": 100_000,
    "What will the funds be used for?":
      "For a wellness centre here in Kaduna, Nigeria to serve children, youth and adults as well as a metaverse sanctuary to serve communities the web3 space. The breakdown of grant funds: 40% will be invested in product and service development to enhance our offerings, 20% will go towards building a talented and dedicated team, 10% will be allocated to marketing and sales to expand our reach, 5% will be reserved for regulatory compliance to ensure we meet the highest industry standards, and the remaining 25% will be set aside for miscellaneous expenses.",
    "What progress have you made?":
      "Our weekly sessions in web3 communities have been well-received, and we've seen a growing interest in our unique blend of oracle readings and astrological insights. Feedback has been overwhelmingly positive, indicating a genuine need and appreciation.   Our team is still being put together but we recently qualified to compete in Artizen Season 3 which is a big deal for us. With Juicebox as our sponsor, we hope to raise funds the authentic way!",
    "Why are you the right person to make this project?":
      "My journey has been enriched by personal experiences, challenges, and learnings, making me empathetic to the needs of others. My commitment to holistic wellbeing stems from a belief that everyone deserves access to a complete life package; mental, emotional, spiritual, physical, financial and environmental care.",
    "Project logo":
      "https://api.typeform.com/responses/files/104ff45278b95ec688be6eb28153cd12152d1970bdd640f079453d5db5f418a4/EncompassWell_Artifact_.png",
    "Video or image":
      "https://api.typeform.com/responses/files/89d84369c253f9c5ec2080494dd446f5db39f9569207b434b84c24a34249a93d/EncompassWell__Video.mp4",
  },
  {
    "Owner name": "Mephixtae",
    "Project title": "Mephixtae",
    "Official link": "https://linktr.ee/mephixtae",
    Tagline: "Conceptual Artwork exploring deep conflicts of the mind",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I am a conceptual artist who creates traditional art using graphic pen and acrylics on canvas. I like to draw out my minds deeper ramblings and paint them on canvas. I utilize digital paint in some of my art pieces wherever required as well.",
    "How much do you need to raise (in US dollars)?": 2_000,
    "What will the funds be used for?":
      "I plan on using the funds to buy art supplies and promote my work on social media via paid ads",
    "What progress have you made?":
      "It has been an incredible journey exploring different states being and mind with my artwork. I work solo and have self funded all of my work up until now but I realize that I need to pick up the pace to distribute my artwork in a wider network. To be able to put it in front of more eyes is a goal that I am excitedly looking forward to.",
    "Why are you the right person to make this project?":
      "I have an educational and professional background in creating artwork using traditional tools and marketing it to potential buyers.",
    "Project logo":
      "https://api.typeform.com/responses/files/62a1e6825dd51a4c2189a5b20d66513bf2b2bec7b87b19d29de07ec99c879661/2.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/e27c9e8460d23f261330f56e0c2ce0394503bf05cba317e8659733414a8c7af2/Mephixtae_s_Artwork.mp4",
  },
  {
    "Owner name": "Stephen",
    "Project title": "WeWyll",
    "Official link": "https://www.wewyll.com",
    Tagline:
      "We connect volunteers with nonprofits. Volunteers are rewarded for their service hours from local business partners.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm building a simple digital pass that links volunteers with nonprofits, tracks volunteer hours, and allows volunteers to redeem rewards for their hours from our corporate partners---all powered and authenticated by blockchain technology.",
    "How much do you need to raise (in US dollars)?": 78_072,
    "What will the funds be used for?":
      "Development and deployment of soulbound NFT MVP, scaling initiatives, monthly operating costs, tax and legal fees.",
    "What progress have you made?":
      "We're an incorporated C-corp with a functional website, a solid start-up attorney, and a great group of advisors. We currently have 500 volunteers in our community, 75 nonprofit partners, and 3 rewards partners.",
    "Why are you the right person to make this project?":
      "As a lifelong volunteer---and through my work as a writer in the entertainment industry and web3 ecosystems---I am uniquely positioned to lead a company that aims to disrupt the volunteering industry.",
    "Project logo":
      "https://api.typeform.com/responses/files/2682b29d41d3953f9670422aab54ffea7ef08c54807d88e6336348f9c2c5801b/WeWyll_11_copy.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/4cedcb93b31ae3bb227abe328b2dde7535b50fb4a9e4b994d7023c438f21dd4f/Intro_to_WeWyll.mov",
  },
  {
    "Owner name": "Orpheus Lummis",
    "Project title": "Covalence",
    "Official link": "https://www.covalence.space/",
    Tagline:
      "Flexible valuation and distribution framework for collaborative projects.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I’m leading and building Covalence.  It enables projects, big and small, to flexibly and collaboratively construct valuations of the project, and distribution tables. It aims to extend DAO frameworks with this new paradigm of capabilities, including opt-in private (FHE) computation.  It is used recently at the Film3 Summit in LA for all contributors to build a valuation and distribute equity of a short film production.",
    "How much do you need to raise (in US dollars)?": 30_000,
    "What will the funds be used for?":
      "We are looking to fund an MVP, over 4 months, 30 hours per week split between team members, 50 USD-equivalent per hour. This is about 30K USD-equivalent including a small buffer. 90% of it will be software development, 10% branding and marketing.",
    "What progress have you made?":
      "We have a partial prototype leveraging fully homomorphic encryption. We built a set of smart contracts. We have assembled a small team with a lot of combined experience and complementary skills.",
    "Why are you the right person to make this project?":
      "I have been involved in a lot of collaborative projects. I've been interested in DAO governance. I've worked as software engineer in web3, and also won multiple hackathons in the space.",
    "Project logo":
      "https://api.typeform.com/responses/files/f3ebd7fdd6ef636e91d820c9f0294f52d8878f6584ac739f77da8568f3841f2d/Covalence.png",
    "Video or image":
      "https://api.typeform.com/responses/files/888fbd12280b071104bd614370b4ec294ef1bb82e9b6a9185f2201b571a9bdaf/Covalence.jpg",
  },
  {
    "Owner name": "Teresa",
    "Project title": "MintWorld Game",
    "Official link": "https://mintworldgame.com/",
    Tagline: "MintWorld is community owned NFT based 2D Monster Catcher RPG",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "We are building a truly 100% on-chain and forever Free-2-Play game. Our vision is to create a simple, low barrier to entry game, with the easiest onboarding experience possible that appeals to a large community of gamers across all generations, platforms & technologies: Pokémon aficionados, 2D Pixel RPG games nostalgic, traditional trading cards gamers and collectors, NFT collectors, and game developers.  We are using blockchain technology as a means to give gamers what they were always looking for: true ownership of in-game assets, real rewards for player activity and fair in-game progression. To achieve this we are using next-level NFT tech such as dNFTs (dynamic NFTs that have the metadata updating dynamically according to NFT Level and Rank progressions) and give the ability for owners to rent their NFTs and earn royalties on secondary sales. MintWorld is community owned and governed through multiple city DAOs, making the core users at the heart of decision-making for the release of future game features, mechanics, and developments specifically for each city that is launched. You can participate in the Genesis Land NFT launch for our first city MayorDAO, join whitelist! Above else, we put the fun at the core of the gaming experience.",
    "How much do you need to raise (in US dollars)?": 100_000,
    "What will the funds be used for?":
      "Development, build community and marketing",
    "What progress have you made?":
      "The version 1 is already launched on Polygon, players can select their first monster and fight/catch another ones. https://mintworldgame.com/",
    "Why are you the right person to make this project?":
      "I am an Engineer and I have developed it from the begining until now, making the art, the solidity coding, unity coding and integrating it.  I want to bring MintWorld to live and I have the motivation to make it truth",
    "Project logo":
      "https://api.typeform.com/responses/files/4c3004e130f6f80d94893de85f3d1208426e9211a19343f340d8cf9e5b74381c/Logo.png",
    "Video or image":
      "https://api.typeform.com/responses/files/234499d7224e992af4712b31c8cc6244b95f8fd41b601d2848883abf8528c6d4/MintWorld.mp4",
  },
  {
    "Owner name": "Tico Ituarte",
    "Project title": "Ludix",
    "Official link": "https://ludix.gg",
    Tagline: "Learntertainment for the masses",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Ludix is a platform that enables web3 game developers to monetize their IPs, by easily adapting them into educational vehicles. It empowers people to learn by playing their favorite games. It subsidizes learning opportunities for the under-served and under-represented around the globe.",
    "How much do you need to raise (in US dollars)?": 500_000,
    "What will the funds be used for?":
      "Development and support of G2M strategies.",
    "What progress have you made?":
      "We have soft commits at ~100K; garnered interest from prospective clients in the US, LatAm, and EMEA regions; waiting on word from 2 acceleration programs (in the final stage of vetting;) qualified for Artizen's Season 3.",
    "Why are you the right person to make this project?":
      "I come from a family of educators, born and raised in LatAm where I have been getting better living opportunities due to a better education. Co-founded Ephere Football (now MetaSoccer) and realized that learntertainment is a prime business op for emerging markets, and have the bizdev potential to make it happen.",
    "Project logo":
      "https://api.typeform.com/responses/files/414672879e0b4d77143726e7ba3893476cd1836946bf03fe441171a266cc81a0/FIAsset_1_3x.png",
    "Video or image":
      "https://api.typeform.com/responses/files/0bf65b35eb73aa79faf2a93d4bbcc11936a3900a02d70b7bbe6f1a13dbeb72dd/LudixPitch_1min.mp4",
  },
  {
    "Owner name": "Daniel",
    "Project title": "Node RPC",
    "Official link": "https://www.noderpc.xyz/",
    Tagline: "The cheapest and reliable Ethereum and L2 JSON RPC provider.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I am building an affordable Ethereum and L2 RPC provider that is 10-100x cheaper than the others. Apart from the rate limit, there are no other limitations (like compute units, credits, daily/monthly limits, etc).",
    "How much do you need to raise (in US dollars)?": 20_000,
    "What will the funds be used for?":
      "Purchase additional HW equipment to scale faster. We have already invested our money in the current HW infrastructure to build the proof of concept. Now we need to scale the existing product to match the reliability of other existing providers while maintaining the same lowest prices for everyone.",
    "What progress have you made?":
      "We've successfully built a working proof of concept for Ethereum and other L2s (see our product here https://www.noderpc.xyz/) and have acquired our first few customers without any marketing effort. We haven't raised any money yet. We are a small team of web3 enthusiasts - developers investing our own time and money into this project.",
    "Why are you the right person to make this project?":
      "We are web3 developers and have been working for blockchain companies/projects for several years. We noticed that the current market offers a lot of reliable RPC providers, but they offer more or less the same prices and similar limitations. We decided to build a proof of concept product to show that EVM JSON RPC services can be offered at a much lower price point, while maintaining the same service quality and reliability. This will make RPC services more affordable for web3 developers (especially for smaller startups) and contribute to building the web3 ecosystem at a faster pace.",
    "Project logo":
      "https://api.typeform.com/responses/files/65b262b66148bb141ae73fdc2d6da8bede53db1e1419af450d4b0c6da1030dfa/logo_small.png",
    "Video or image":
      "https://api.typeform.com/responses/files/0da72f7815a451be6db6c0502a316740f4b706905eb927c6659584e95a79907d/Final_subtitles.mp4",
  },
  {
    "Owner name": "Leanne Bats",
    "Project title": "Tres Cool",
    "Official link": "https://www.trescool.co/",
    Tagline: "The internets coolest climate action company",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "We're building Tres Cool to making climate action radically transparent, undeniably accessible, and above all, indisputably cool.   We're doing this by developing groundbreaking, open-source web3 technology, that can turn everyday interactions into climate actions - enabling lifestyles to be part of the solution, not the problem.    We do this with our proprietary tech: \"ERC-Cool\", a smart contract interface composable with any standard to weave real-world, perpetual carbon removal into any asset. The ERC-Cool is triggered with each sale or trade and a % of funds is used to purchase high quality carbon removal credits which are retired. Finally we then tokenise the impact as Cool Factor ($FKTR) where 1 FKTR = 1 KG of carbon removed. This is made available to the end user, to provide ironclad proof of impact (down to the gram).",
    "How much do you need to raise (in US dollars)?": 75_000,
    "What will the funds be used for?":
      "Further development - including adding more chains, decentralising the whole process with on-chain carbon and also ability to interact with physical products. We will also be working on marketing and our website to offer fun options to use FKTR",
    "What progress have you made?":
      "We have shipped code: https://github.com/Tres-cool/ERC-Cool (open source)   And launched with Book.io on Polygon to create the worlds first carbon removing book: https://polygon.technology/blog/buy-a-digital-book-remove-co2-book-io-and-trescool-team-up-for-launch-on-polygon  We have received a grant from Solana to develop our ERC-Cool for their ecosystem (SPL-Cool)  We have an epic team, female founded and have No Standing behind us for our Marketing and Blockstars as our development partners.   We have bootstrapped up until this point!",
    "Why are you the right person to make this project?":
      "It all started as a promise to leave a better planet for my son (and his generation). My background, coupled with the determination of a mother, led me to create a solution that resonates with millions and can actually change things for the better.",
    "Project logo":
      "https://api.typeform.com/responses/files/8ece78c9f97ba2aa7162154dec504528d2d4e0371e802297364f4b123b2ba0d9/Tres_Cool___Black_Logo.png",
    "Video or image":
      "https://api.typeform.com/responses/files/c573571632513c410a832479ba793365bcd5faa824ca065d181b91c0a80cb50a/Tres_Cool___ERC_Cool___Demo_Video__1_.mp4",
  },
  {
    "Owner name": "Anon",
    "Project title": "LLaMA2-Accessory",
    "Official link": "",
    Tagline:
      "LLaMA2-Accessory is an open-source toolkit for pre-training, fine-tuning and deployment of Large Language Models (LLMs) and mutlimodal LLMs.",
    "Web3 & blockchain": "No",
    "Tell us about your project.": "",
    "How much do you need to raise (in US dollars)?": 0,
    "What will the funds be used for?": "",
    "What progress have you made?": "",
    "Why are you the right person to make this project?": "",
    "Project logo": "",
    "Video or image": "",
  },
  {
    "Owner name": "Anon",
    "Project title": "chatgpt.js",
    "Official link": "",
    Tagline:
      "chatgpt.js is a powerful JavaScript library that allows for super easy interaction w/ the ChatGPT DOM.",
    "Web3 & blockchain": "No",
    "Tell us about your project.": "",
    "How much do you need to raise (in US dollars)?": 0,
    "What will the funds be used for?": "",
    "What progress have you made?": "",
    "Why are you the right person to make this project?": "",
    "Project logo": "",
    "Video or image": "",
  },
  {
    "Owner name": "Pedro",
    "Project title": "Looking for Gaia",
    "Official link": "https://rmterra.org",
    Tagline:
      '"Looking for Gaia" is a captivating film that explores humanity\'s quest to reconnect with nature.',
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      'The impact of "Looking for Gaia" lies in its ability to raise awareness about the importance of nature and the urgent need for environmental change. By exploring themes of reconnecting with nature and the transformative power of fire element.',
    "How much do you need to raise (in US dollars)?": 5_000,
    "What will the funds be used for?": "video production  and marketing",
    "What progress have you made?":
      "We already shoot almost all parts of the movie",
    "Why are you the right person to make this project?":
      "I'mk the founder of  RMTerra a reforestation project and i plant trees since child i have a very deeep connections with this beings",
    "Project logo":
      "https://api.typeform.com/responses/files/73909b3ab3f4cc4417d24cde521cc00489621bfc954f3cea75d4c3734e6008c6/logo_EARTHCARE_2023_01_02.png",
    "Video or image":
      "https://api.typeform.com/responses/files/10291b9491c7561e3d20373ae98f45298ff208c1e57ac7bb544a096fa90b963c/391616392_7203953842971038_6049025132696567934_n.jpg",
  },
  {
    "Owner name": "Reinout",
    "Project title": "Black Intelligence",
    "Official link": "https://www.hellenthalstudios.nl",
    Tagline:
      "Searching life beyond wormholes, explorers are placed in a generative AI world to find answers concerning the human race",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I’m making a fictional film about human curiosity in life beyond wormholes.",
    "How much do you need to raise (in US dollars)?": 25_000,
    "What will the funds be used for?": "Development, research, PoC",
    "What progress have you made?":
      "Research and development regarding the project is in progress. A first pitch deck is almost finalized for subsidiaries, investors and potential funds. I’m working with screenwriters and I’m advised by a team of filmmakers with the same curiosity.",
    "Why are you the right person to make this project?":
      "I think curiosity to extraterrestrial life and AI brings humanity to a next level in the coming centuries - but has limits. My films are always focussed on social impact and usually of dramatic nature. This film can be the best of both ends.",
    "Project logo":
      "https://api.typeform.com/responses/files/e915cada4b8af7560cd5620c8995d1cda62b03faec82f973bca3efdd106b238f/BI.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/f57bfa0e44af571284190635962b3f7430b9d2055c33b418f66fea2890df9c79/BI.mp4",
  },
  {
    "Owner name": "Iurii",
    "Project title": "Fraime",
    "Official link": "https://t.me/fraimebot",
    Tagline: "Ai video bot for content creators",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm developing Fraime, a \"deepfake\" Telegram bot tailored for social media content creators. Fraime simplifies the creation of captivating face-swapped videos on any device. The process is straightforward: send a video with one face and a photo with another, and after a brief wait, the bot delivers the deepfake clip. Users can also conveniently share direct links from TikTok, Instagram, and YouTube, alongside uploading video files.  Expanding beyond our core deepfake service, we're working on implementing more AI tools, such as Voice Deepfake, text-to-video/video-to-video animations, image and sound generators. These additions, integrated into the social media platform, are fostering a growing community for AI artists, with over 1,700 users already on board.  To access Fraime's services, users acquire TIME tokens, representing seconds of user-generated videos on the platform. TIME is a payment token that will transition to a blockchain network no earlier than the second quarter of 2024, providing AI artists with greater flexibility in managing their funds beyond direct service expenses.  To attract new users, we're implementing a referral system that will allow creators to earn TIME tokens, with inviters receiving a percentage fee from their referrals.  Fraime's full release to the public is projected for the end of November 2023.  The nearest task right now is to deliver a full version of the Fraime bot with the referral program to all our users. As well as analyze the data on token performance to evaluate and build tokenomics of the project.",
    "How much do you need to raise (in US dollars)?": 25_000,
    "What will the funds be used for?":
      "GPU renting, Expanding our team by hiring additional developers skilled in ML&NN and Blockchain. As well as community management staff. And for promotional campaigns to target Telegram, TikTok, Instagram and YouTube users",
    "What progress have you made?":
      "At the time of writing we've managed to build a working product that had passed the testing phase on human users and received strongly positive feedback:  https://www.producthunt.com/posts/fraime   So far we've got over 4000 users in the bot. With over a hundred users purchasing token packages. Additionally, we manage Fraime community with over 2000 group members in Telegram.   We haven't raised any money yet. Fraime has been built by organizing our own resources.",
    "Why are you the right person to make this project?":
      "Since 2016 I have worked in the cryptocurrency field. Providing private consultations on crypto tools, services, technologies and opportunities/threats of Blockchain execution for non-Blockchain users.   In 2018 I, additionally, engaged in building Telegram bots. Since then I have helped to create more than 20+ bots including my own projects. Among them were crypto gambling bot, mental health support bot, car insurance info bot, telegram channels aggregator bot and others. I earned experience in projecting bots' architecture, shipping a working UX, considering the chat interface's limitations and possibilities for re-packaging of classic web services inside a messenger app.   Since 2019 I've become fascinated by deepfake and machine learning. Had the unsuccessful attempt to create a photo deepfake bot. Which eventually led me to re-launch the project this year with more expertise on how to build bots. Along with knowledge of the cryptocurrency area, I can deliver users a simple and engaging tool for content creation while integrating necessary crypto solutions into the main product.",
    "Project logo":
      "https://api.typeform.com/responses/files/f4ddeda2286002ff6bef85a9e568c03929d28a42da21c8975615783ca542d054/IMG_20230823_204133_069.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/ce2369a3bb60d8e62f4cf8936159372d4aca21ca222963bad7f6fecc3c156898/lv_0_20231031231417__2_.mp4",
  },
  {
    "Owner name": "Glenn Little II",
    "Project title": "Fractal Visions",
    "Official link": "https://www.fractalvisions.io/",
    Tagline:
      "We built a multifaceted creator hub focused on impact makers in the web3 space who align with the same values of our ecosystem. Reiterating the ethos of impact over profit with a retroactive rewards mechanism generated by the market fee to attract authentic creators and developers to Fractal Visions platform.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Support our mission. Our team has built a platform to help highlight web3 projects on the different networks related to public goods. Starting with Optimism.  ~ Fractal Visions Mission Statement ~  Let's create a new generation of creators.  Fractal Visions is here to help educate others with our creative process.  Working one on one to highlight creators and builders as they are entering into the world of cryptocurrency.  Our main goal is to help onboard both old & new users into the public goods ecosystem. The way that we accomplish this mission is by reiterating the ethos of public goods with our own implementation of a Retroactive Public Goods Funding mechanism into the design of our MVP & utilizing Quadratic Funding tools known as the Grant Stack Manager provided by Gitcoin.",
    "How much do you need to raise (in US dollars)?": 4_000,
    "What will the funds be used for?":
      "Our fundraising goal is set at $4000 for our Core Engineering Team which excludes foundation members from the allocation of the funds raised.",
    "What progress have you made?":
      "Here is our current progress. https://gap.karmahq.xyz/project/fractal-visions-1/",
    "Why are you the right person to make this project?":
      "We are responsible and transparent with the way we distribute grant funding to our team.",
    "Project logo":
      "https://api.typeform.com/responses/files/6bd1a682a68dd1034858612f18ffc517b91ec1abd77091701df83387b74ad3af/3d_FV_green_invert.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/b0da9599a8d395706bfdca0805b78ed8724c2063e1b7bfa0a3458130e542446c/mvp.png",
  },
  {
    "Owner name": "Eldari",
    "Project title": "OnThis",
    "Official link": "https://onthis.xyz/",
    Tagline:
      "Send ETH to human readable addresses to bridge, swap, stake, mint and more directly from your wallet.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I am building shortcuts which are ENS domains to which users send ETH to human readable addresses to bridge, swap, stake and more directly from their wallets. Web3 involves complex concepts and technical jargon that can be confusing for the average user and most applications often lack intuitive onboarding processes making it challenging for new users to get started. Learning the ins and outs of web3 can be an uphill battle. The protocols and their UIs are complicated, and there are risks of human error and scams such as phishing. As a builder in this space I want to enhance the user experience and reduce the barrier to entry and growth in Web3. A shortcut is a combination of 2 or more DeFi actions which are executed in one transaction. Each Shortcut is a smart contract which connects existing protocol functions together to execute a specific user intent.  So each Shortcut = Intent = deployed to a dedicated Smart Contract.  To execute a specific intent (e.g. bridge to L2 and stake on Beefy), you simply send ETH to that intent's Shortcut Smart Contract address. Each deployed Shortcut Contract has a dedicated ENS domain, giving end-users ability to perform intents simply by sending ETH to human-readable addresses.  Shortcuts do not add on any extra smart contract risks in addition to the current DeFi protocols that are being used under the hood.  When you interact with Shortcuts, you are doing the same thing you would be doing when interacting with DeFi protocols on your own - just in less time and risk involved!   One of the biggest advantages of using shortcuts is that you're not waiting for one transaction to settle in order to move on to the next one.",
    "How much do you need to raise (in US dollars)?": 100_000,
    "What will the funds be used for?":
      "Token incentives. We are building an in-house point system that will reward shortcut users. These incentives will push users to try shortcuts and see for themselves how revolutionary it is to interact with web3 via ENS domains that represent intents.",
    "What progress have you made?":
      "We are a team of 4 working full time. Igor - Co-Founder & CEO Nodar - Product Manager - Prev. Co-Founded Zapper Danil - Lead Developer Eldari - Co-Founder & Community We’ve set up a dune analytics dashboard for on this which can be viewed here. https://dune.com/Nodar/onthisxyz In ~2 months we’ve seen an inflow of 100+ ETH and 70+ unique users.",
    "Why are you the right person to make this project?":
      'I believe that my team and I are the right individuals to undertake this project for several compelling reasons. We are wholeheartedly dedicated to enhancing the user experience and security in the web3 and DeFi space. Our approach centers on making it as seamless and user-friendly as possible for web3 users to interact with various DeFi applications. Here are some key points from our background that make us uniquely suited to create this project:  User Experience Focus: Our team places user experience at the forefront of our project. We understand the challenges and complexities that web3 and DeFi users face. By prioritizing user experience, we aim to create a platform that not only attracts more users but also retains them by ensuring an intuitive and hassle-free experience.  Security: Security is paramount in the DeFi space, and we are acutely aware of the importance of safeguarding users\' assets. Our commitment to implementing robust security measures and protocols will instill trust and confidence among our users.  Team Expertise: Our team comprises experienced professionals who have a deep understanding of blockchain technology, decentralized finance, and web3 ecosystems. We have a track record of working on projects that have achieved significant success in this space.  Successful Track Record: Notably, our Co-Founder, Nodar, has previously founded "Zapper," a DeFi project that achieved tremendous success and gained recognition in the crypto community. His experience and insights from this venture have provided valuable lessons that we are incorporating into our current project.  Strong Network: Through our past experiences and connections, we have cultivated a strong network of industry experts, developers, and partners. This network will be a valuable asset as we navigate the challenges and opportunities in the web3 and DeFi space.',
    "Project logo":
      "https://api.typeform.com/responses/files/8456646dcb19b81fc3d359504bb652294e21377119b0024fac4c9b3729a6e54e/OnThis_Logo.jpeg",
    "Video or image":
      "https://api.typeform.com/responses/files/7a5b98137de3a05d4c2cc11fb19a3ccabf0def98d04a92bb867025563bb30c20/onthis_bridges.gif",
  },
  {
    "Owner name": "Tamar Zarkua",
    "Project title": "The Radiants",
    "Official link": "https://www.instagram.com/the_radiants12/",
    Tagline: "Web3 NFT Based cartoon series",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      'I am creating participatory experience for users who will buy The Radiants NFT\'s. What does this mean? users who will visit my website, they can see two main thing, one is TV cartoon series "The Radiants" and another NFT Characters from these TV series. When user will buy Radiants NFT character they can also choose to incarnate their character into the cartoon show and be part of one of the series, also create any plot twist they wish to see with their character.',
    "How much do you need to raise (in US dollars)?": 64_000,
    "What will the funds be used for?":
      "I need web developer who can help me with making and running my website. besides that I will need to add 2 more animators, several voice actors and one background artist to make first NFT based tv cartoon series as fast as possible. To sum up I will need this amount money to pay web developer, animators, voice actors and artists",
    "What progress have you made?":
      "I started this project about two month ago. I know I am at the very beginning, but I already have 3 people who are helping me to make this whole idea into reality. we have written 2 episode script and created radiant character, currently we are working on NFT collection of the Radiants. We need several resources to make this project work and shine as it deserves. This is why I am applying for Juicecrowd.",
    "Why are you the right person to make this project?":
      "I have build up skill that makes dedicated entrepreneur. I also have created several animations throughout years. I am oriented on grow not only me  but my team as well",
    "Project logo":
      "https://api.typeform.com/responses/files/843d11ae8311a03e6b29201f50285bb796b53cf16f971f13eb13156b72d7a076/logo.png",
    "Video or image":
      "https://api.typeform.com/responses/files/98b18a21d61b4a8637868a21182b058bbd95794f46029459b131e4f555d72bd6/პოსტერ.png",
  },
  {
    "Owner name": "Cii",
    "Project title": "Airdrops Network",
    "Official link": "https://airdrops.plus/",
    Tagline: "Decentralized Steam Unlock unlimited rewards with Airdrops Plus!",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Airdrops is a decentralized game publishing and event platform, positioned as a one-stop app store for chain games on Steam. In the early stage, it mainly unlocked unlimited rewards through Airdrops Plus!  By combining game publisher airdrops and integrating platform incentives, it brings players a one-stop playing and earning experience, helps game publishers obtain traffic through real interaction, incentivizes platform gamers with platform tokens, helps players obtain high-quality gaming experience and earn extra rewards, helps game publishers obtain early traffic and quickly publish games. Airdrops is a multi-chain platform that builds a loyal community of gamers through NFT.",
    "How much do you need to raise (in US dollars)?": 2_000,
    "What will the funds be used for?": "development and marketing",
    "What progress have you made?":
      "We have an official website and community member NFT pass card",
    "Why are you the right person to make this project?":
      "We have a professional team to conduct market project analysis and research, which helps us select high-quality projects",
    "Project logo":
      "https://api.typeform.com/responses/files/96782eadccc342f109efc2df8c9285ce47d3c18fc1dab5d3a3c59e4b333540b4/airdrops.png",
    "Video or image":
      "https://api.typeform.com/responses/files/1edcf354ea1ba02a0a56edad9a44070d615339c1fb98a7eb0f18231acc5ade09/2___Compressed_with_FlexClip.mp4",
  },
  {
    "Owner name": "waly",
    "Project title": "REY",
    "Official link": "https://rey.xyz",
    Tagline: "The Front Page To Web3",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "We’re building a decentralized media platform thats redefining the way people discover and interact with content online. Powered by a SocialFi protocol.",
    "How much do you need to raise (in US dollars)?": 250_000,
    "What will the funds be used for?":
      "Launch Campaign, Content, Onboarding Open Beta Users",
    "What progress have you made?":
      "Raised 1M$ in private crowdfunding, Shipped 2 products with Traction, built a 10x team, now partnering up with multinational bands and brands like Gorillaz",
    "Why are you the right person to make this project?":
      "I am lifelong film maker and digital media veteran turned venture founder with a line of successful projects across multiple fields. I am on a mission to redefine online interaction by fixing the broken discovery of social platforms. I am the right person to solve this because I am the first user benefiting from the product.",
    "Project logo":
      "https://api.typeform.com/responses/files/c72aef4f3374685d2f3a3535c4b715d6d7d758fc593b0f52c3be93e74974d137/6DFD5C44_20EC_4710_9EE5_78445504F0A8.jpeg",
    "Video or image":
      "https://api.typeform.com/responses/files/d3719f6b900b8e7df143db3f77aafd9fa8ab195f7a71805ff72b01f4e2734d04/trim.A927EAD5_E48B_43DF_B6E6_A4B88E34EE72.MOV",
  },
  {
    "Owner name": "Heet Jain",
    "Project title": "RWA - Luxury Jewelry, Gem Stones & Diamonds",
    "Official link": "https://twitter.com/dtefrev",
    Tagline:
      "Tokenisation (RWAs) of Luxury Jewelry, Gemstones & Diamonds using Blockchain Technology.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm focused on the tokenization of luxury jewelry, gemstones, and diamonds, addressing the challenge of proving authenticity in an evolving market where lab-grown diamonds (CVDs) are increasingly replacing traditional ones. The goal is to provide a solution for verifying authenticity, as distinguishing between CVDs and natural diamonds has become complex.   Moreover, given the high value of luxury jewelry and gemstones, proving ownership through blockchain technology stands as the most effective method, which will revolutionize the authentication process, ensuring a more seamless, transparent, and trustworthy environment for trading high-value assets in the luxury jewelry and gemstone industry.",
    "How much do you need to raise (in US dollars)?": 45_000,
    "What will the funds be used for?":
      "The allocated funds will be strategically deployed across various domains crucial for the project's success. These areas include marketing, advisory services, legal requirements, developer resources, business development, and other essential segments.",
    "What progress have you made?":
      "So far, I have done the background work of approaching web2 organisations required to assist in tokenisation. Like for Vaulting services, there is Brinks, for authentication have just met the owner of SSIF (worlds best lab which authenticates Real Gemstones). Also discussing and introducing the same to Luxury Jewelry Makers.  So basically, working to build the foundation of web2 to ensure the efficient sustainability of the web3 aspect of the project and set it on a trajectory for continuous success.",
    "Why are you the right person to make this project?":
      "I have been in the Luxury Jewelry, Gold & Silver & Diamond Jewelry for the past 12 years, have been leading the Business Development for a firm which is into Manufacturing of Gold & Diamond Jewelry. Having a good network of manufacturers/sourcing, and buyers & sellers of all kinds of High Value Gemstones & Luxury Jewelry, is what gives me an edge in itself. This is the web2 side. When it comes to web3, I have been in the industry since 30 months, my conscience hasn't budged when it comes to decentralisation and its tremendous use cases.",
    "Project logo":
      "https://api.typeform.com/responses/files/b3cb838744938dee4feee883040070310207841e54079393206b37e6259c79f6/Screenshot_2023_10_29_at_12.32.52_AM.png",
    "Video or image":
      "https://api.typeform.com/responses/files/04adb92d21c13a3337955ca52416b65feb13be66d06ff4e1e40ec8af9bafb428/introductory_video_odIWy6sG.mp4",
  },
  {
    "Owner name": "David",
    "Project title": "NFT Price Floor",
    "Official link": "https://nftpricefloor.com/",
    Tagline:
      "Your NFT data-hub and gateway. Discover collections, brands and creators all-in-one place",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "We are building the 100% NFT focus coinmarketcap-like, that allows you to track and discover your favourite collections, brands and artists seemlesly.",
    "How much do you need to raise (in US dollars)?": 350_000,
    "What will the funds be used for?":
      "Add market stats, portfolio tracker, notifications, mobile app, community twitter spaces, integrate NFTfi protocols, etc",
    "What progress have you made?":
      "As first mover in the NFT data space, we have consolidated our position almost in our 3rd year of running the company",
    "Why are you the right person to make this project?":
      "We are 3 co-founders, a business and product consultant (and defi enthusiast); a marketing expert with +15 experience (+5 in web3) and NFT OG; and a fullstack and blockchain dev with +5 years of experience in web3",
    "Project logo":
      "https://api.typeform.com/responses/files/832609a2e7fe436aa2d45b2c46940198695989a70823363ea084b5ee43f0f865/150x.png",
    "Video or image":
      "https://api.typeform.com/responses/files/903bee70248e1143e03ca9111ecbd5aff47ad008daea782011ac7735282fa6a3/nftpricefloor_1698482159992.mp4",
  },
  {
    "Owner name": "Lucy",
    "Project title": "Smoothie.fyi",
    "Official link": "https://www.smoothie.fyi/",
    Tagline: "Put all your stickers on-chain",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "A web3 digital sticker profile, where users can showcase interests via NFT stickers. Users can print physical QR stickers to showcase on their gadgets, linking to their online profile, while inspiring real-world interactions.",
    "How much do you need to raise (in US dollars)?": 18_000,
    "What will the funds be used for?":
      "Fund the 2-person team for 3+ months to support the product/app development, design, and marketing. Allocate funds for server, APIs, and printing of physical QR stickers.",
    "What progress have you made?":
      "Done: Assembled the core team - engineering and product person who connected over similar passions and interests! Created a prototype of the user profiles. Designed the programmable physical QR stickers. Designed digital stickers as an initial pool in the NFT sticker marketplace. Next: Showcase physical QR stickers at ZuConnect Istanbul. Design new stickers. Collect user feedback and iterate the app development.",
    "Why are you the right person to make this project?":
      "(1) I built a similar project badge generator at octobrain.one (2) I deeply care about connecting people in real-life (Developed & launched the Emotional intelligence board game: https://www.kickstarter.com/projects/bcad/eibg-emotional-intelligence-board-game) (3) I’ve previously worked on a web3 start-up company and built a full-stack web app from scratch for them. So technology-wise I feel competent.",
    "Project logo":
      "https://api.typeform.com/responses/files/6868d1fb893ae2d824eee4c17cd79c9b1ab4cfd6cb2c7a2f14f48cc655f96528/image_3.png",
    "Video or image":
      "https://api.typeform.com/responses/files/b98f8615295cb6a7d8ce5a2f70b50cc27db65f71c54483d9fb2654fe6f865fbd/smoothie_fyi.mov",
  },
  {
    "Owner name": "Ce Guan",
    "Project title": "dao3.ai",
    "Official link": "https://dao3.ai",
    Tagline:
      "An all-in-one fully onchain dao management tool which is aimed to keep the dao on the right track and rug-free.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm building a product that allows anyone to create a DAO, it features 1. smart contracts controlled DAO treasury so that no one can move the money out of treasury without the voting process; 2. It uses modern management tools like OKR to keep the DAO on the right track to achieving something. 3. Token holders can vote to challenge/change DAO management members to keep the DAO's vitality and avoid ossification.",
    "How much do you need to raise (in US dollars)?": 100_000,
    "What will the funds be used for?":
      "Audit report, UI&PM, further development, marketing",
    "What progress have you made?":
      "The MVP site is online, please visit dao3.ai. Token holders now can create a DAO, create and vote for proposals, and manage the treasury via voting.",
    "Why are you the right person to make this project?":
      "Firstly, I firmly believe in and am committed to leveraging the immutability and openness of blockchain technology to develop products that are useful in the real world, making the world a better place.  Secondly, both myself and my partners possess the technical capabilities to realize this vision. My partner was previously the CTO of a 500 Startups company.  Thirdly, my extensive experience in the internet industry improves the probability of achieving the ultimate goal. I have worked in several technology media outlets in China and served as the Co-editor-in-chief of TechCrunch China, witnessing and reflecting on the successes and failures of many startups. Later, I left the media industry, self-taught programming, and engaged in various roles including a full-stack developer, Developer Community Manager at CSDN (China's largest programmer community), and growth hacker for ShowMeBug, a programmer interview tool backed by Sequoia Capital. With these experiences, I am confident in delivering and driving growth through product.",
    "Project logo":
      "https://api.typeform.com/responses/files/323afc9d95a87d0d30e758c79739f7f14420979f4e4110cabbc2c71d5fcc54bc/dao3.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/42e699a9becc491889ed5f5540c5c9f7b1c8679384990921235a88566e39b75e/dao3.png",
  },
  {
    "Owner name": "Christian Alexandrescu",
    "Project title": "Metalancer",
    "Official link": "https://metalancer.com",
    Tagline: "On-chain webcomic publishing and reading",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm building a project that allows creators to publish webcomics as soulbound NFTs, ready to be collected by users on our app using account abstraction and in app purchases. This opens up a whole new level of digital collectibility to people who already generally love collecting",
    "How much do you need to raise (in US dollars)?": 200_000,
    "What will the funds be used for?":
      "1. Development of the app (hiring devs) 2. Incentivising creator program",
    "What progress have you made?":
      "We have been focusing on building our community, seeking VC funding for our seed round, and designed the flow of the app.",
    "Why are you the right person to make this project?":
      "I have help every position that there is in web3, from mod to consultant to founder. The experience I have gained by taking every role uniquely positions me.",
    "Project logo":
      "https://api.typeform.com/responses/files/a6c42b7957d92565a1228454d862031dadfa36183cf47a8c63aaad9bd8d05d09/ML_logo.jpeg",
    "Video or image":
      "https://api.typeform.com/responses/files/249ca3c66ddad2e142cd3e30b4c2d86c36226ab58056cc89a6641ce71792a674/ML_video_10mb.mp4",
  },
  {
    "Owner name": "Edward",
    "Project title": "Bcharity",
    "Official link": "https://bcharity-test.vercel.app/",
    Tagline: "The first non-profit sector blockchain ecosystem",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      'I\'m building and operating a public open ledger that allows you to track your donation and its impact.  Problems to solve  "UnCharitable"(https://uncharitablemovie.com/) will change you. It will change everything you\'ve ever thought or been taught about charity, giving, solving the great problems of human suffering that have plagued humanity since the beginning of time and building a world that works for everyone, with, as Buckminster Fuller said, "no one and nothing left out." You will come away with hope you thought was no longer possible.  Solution from us  Bcharity is the first non-profit sector blockchain ecosystem, a charitable program of Canadian registered charity ECSSEN(https://ecssen.ca/) and sponsored by the Canadian government since 2020 dedicated to promote blockchain industry for the public benefit by building and operating a public open ledger based on donor contributions to solve the problem of lack of trust with charity.  Read more about our Pitch Deck at https://drive.google.com/file/d/1529AH_XlnUmRzm_nhKfTuGRxIt5SDeZL/view',
    "How much do you need to raise (in US dollars)?": 300_000,
    "What will the funds be used for?":
      "I plan to use the funds on further development and marketing",
    "What progress have you made?":
      "The progress I have made in the past - Developed Beta Product recently  ​ - Sponsored $300k+ by Canada government  ​ - Partnered with Canada charity ECSSEN... ​ - Supported by UBC, BCIT…​ - Got 6,000+ followers on social media, ins, twitter, telegram, lens…",
    "Why are you the right person to make this project?":
      "I'm a blockchain believer and social entrepreneur with more than ten years experience in re-shaping the future of blockchain tokenomics ecosystem.  - The president of WIBIT blockchain Ltd. - Business Manager of Meteshare.  - The former director of the social enterprise, ECSSEN Travel and  -The co-founder & President of the Canadian register charity, ECSSEN Career School.",
    "Project logo":
      "https://api.typeform.com/responses/files/4ed682b56986ff2a71454bb0eaa505ff08540848a39dde49b6fd9f71463908e9/logo_512_x_512.png",
    "Video or image":
      "https://api.typeform.com/responses/files/e40f72f4a7b2638b1c907032b166f21df15997d0457a07329456b758444b3f4a/Bcharity_Trailer___Clipchamp.mp4",
  },
  {
    "Owner name": "helena",
    "Project title": "respect",
    "Official link": "https://respect.wtf",
    Tagline: "explore what people trust and respect in web3",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm a product/design/executive working on respect in all of the ways possible.   The main problems that we are focusing on are: 1. 👁️ Users tend to rely on friends to explore the ecosystems, but there’s no web3 feed to check what friends from hackathons or friends from discord chats are interacting with — and what they respect. 2. 🗿 Nobody understands blockchain. Ever wondered do people really like some platform or they just use it for speculation? This is because there’s no reputation system so you actually never know the real sentiment.  And from the other side - the B2B side: 1. 🫀 Projects fail user onboarding because they can not identify and engage a relevant audience 2. 🧙‍♂️ Users do not feel any connection with protocols, dapps or ecosystem - all because everywhere they are just wallet addresses which leads to the low retention rates.  We are building a real decentralized social exploration dapp, allowing users to 1. Respect graph: Explore the ecosystem via respect graph, detect the trustful projects and build connections  2. Personalities: Unlock the on-chain personalities in a fun gamified way of minting the NFT personalities cards which are based on the personality test 3. Metamask snap: extension allowing to check your and others personalities&respect + give respects to the protocols or dapps",
    "How much do you need to raise (in US dollars)?": 90_000,
    "What will the funds be used for?":
      "developing a comprehensive and usable platform, crafting a dao and creating a cool community",
    "What progress have you made?":
      "- collected feedback from 17 advisors  - built a proof of concept (attestations, graph, profile) - won a hackathon with this idea  - partnered with Linea",
    "Why are you the right person to make this project?":
      "my team mate already built a similar graph for ton, I myself have been researching and contributing to the identity&reputation projects for more than a year to date",
    "Project logo":
      "https://api.typeform.com/responses/files/57e2b847c1ccee8d8bab7bdd754887aa5aa48da2d2c392843f72c91eb3cb6220/logo_respect.png",
    "Video or image":
      "https://api.typeform.com/responses/files/7ed8446da0a931b1d378bdd4a6be35d25de57abbe2b3d5987ad114b5b5c9b5fd/My_Controversial_Opinion_on_Identity_and_Consumer_Facing_Products__1_.mp4",
  },
  {
    "Owner name": "Haz",
    "Project title": "Brume Wallet",
    "Official link": "https://brume.money",
    Tagline: "The private Ethereum wallet with built-in Tor",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm building an Ethereum wallet that makes all your network requests go through the Tor network, such that the people at the end of the pipe can't use your IP address to track you or censor you",
    "How much do you need to raise (in US dollars)?": 100_000,
    "What will the funds be used for?": "Development, security, marketing",
    "What progress have you made?":
      "We almost achieved feature-parity with MetaMask",
    "Why are you the right person to make this project?":
      "We have strong background in privacy and security",
    "Project logo":
      "https://api.typeform.com/responses/files/c12d36cbff0665074215ef55c4bebff82e347fb721f26897f567b2a1adde1564/squared_512.png",
    "Video or image":
      "https://api.typeform.com/responses/files/2c3ffcc3f1b139c821f00a97b414ea0f61fba49af2937cdc744fc1dd6049385a/sites_ogimages_aHR0cHM6Ly9hZGRvbnMubW96aWxsYS5vcmcvdXNlci1tZWRpYS9wcmV2aWV3cy9mdWxsLzI4NC8yODQwNDkucG5nP21vZGlmaWVkPTE2ODczODEyNTM_.jpeg.png",
  },
  {
    "Owner name": "Humberto Besso Oberto",
    "Project title": "Hikufi",
    "Official link": "https://twitter.com/hikufi_finance",
    Tagline:
      "Micro-credits that make a triple bottom line impact.  We turn profits into benefits for our clients, workers, and investors.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I provide micro-credits to micro-entrepreneurs that go from $125 to $1,500 USD.  These micro-entrepreneurs are mostly unbanked and either do not have a credit score or have a negative one. I provide a deCredit Score for every credit, which enables them to participate in DeFi. I also operate through a postCapitalist approach. This means that all our profit is considered an excess income, and thus is returned to our clients and workers in the form of participatory budgets.  Participatory budgets are first managed off-chain by me, and when the participants graduate from our Participatory Budgeting course they sovereignly manage the budget through a SAFE multi-sig wallet and a forum for proposal-making, thus turning off-chain centralized management into on-chain decentralized management.",
    "How much do you need to raise (in US dollars)?": 185_000,
    "What will the funds be used for?":
      "Credit-lending to a factory of workers where credit will be recoved via automatic salary discount and where the participatory budgeting exercise will be carried out on-chain (88%), onboarding of workers into web3-based participatory budgeting (2%), and forking EthicHub.com (10%) to repourpuse it to micro-business credit lending.",
    "What progress have you made?":
      "We have 6 years operating as a traditional company in two cities of México. We have recently stepped into the ReFi transition through the support of @0xUrbanika (in Twitter).  We transact over $300K USD a year. We are gradually transitioning this amount into ReFi micro-credits.",
    "Why are you the right person to make this project?":
      "I'm not alone :) I, Humberto, am a postCapitalist activist & educator. I work with David Bollier in making courses about the commons: https://urbanika.notion.site/  I've been fundraising for Urbánika using Gitcoin and Giveth for over 2 years. In the past two Gitcoin rounds I've achieved, thanks to our donors, the 5th and 7th places.  Gerardo, the founder of Hikufi (the fintech), has been working for over 9 years in the financial industry.  Juan, the city manager, has gone from selling credits, to recovering the, to managing the biggest of our cities: Monterrey, Mx.  The team includes several people working at the street level and at the administrative, accounting, and regulatory levels. We are a officially registered company regulated by the Mexican Government.",
    "Project logo":
      "https://api.typeform.com/responses/files/4a3d9b00af21a735ce6890f0854d61a6c6e8f21f2a69e3a7be43855bfefe723d/Hikufi_logo.png",
    "Video or image":
      "https://api.typeform.com/responses/files/686ab3e283602079efe4a018ef163098ea4bbe88772805b5e9b82b9fd98b1711/Hikufi_Finance_explained_resized.mp4",
  },
  {
    "Owner name": "Tim",
    "Project title": "Bitmail",
    "Official link": "https://t.me/bit_mail",
    Tagline:
      "Bitmail: A p2p blockchain based Email, Payments and NFT Storage System",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm building Bitmail to allow users to send blockchain email, payments and securely transmit and store NFTs. As well as account reconciliation on the blockchain.",
    "How much do you need to raise (in US dollars)?": 250_000,
    "What will the funds be used for?": "Development and Marketing",
    "What progress have you made?":
      "I've applied to an exciting Japanese based VC fund that specializes in web3 projects. Waiting to hear back.",
    "Why are you the right person to make this project?":
      "I have global connections in the industry that make me uniquely suited to delivering this project.",
    "Project logo":
      "https://api.typeform.com/responses/files/d0b0b370abd91397a6c53a8a9fbc203a41e8ede3ee530d9254d782206709e023/2KTIOq7R_400x400.jpg",
    "Video or image":
      "https://api.typeform.com/responses/files/5806a97db2ca560bc8eacca16bfedc12e1abeaa4bf037e1c0dfe87c9bc91acde/d1b544b02b77dd8b.jpg",
  },
  {
    "Owner name": "Xavier Rousset",
    "Project title": "A Trip To Transformation Documentary",
    "Official link": "https://youtu.be/YYVvfRRUN0U?si=IzGnkNxe9ujtY4Ro",
    Tagline:
      "Support a groundbreaking documentary on psychedelic medicine in Australia.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "I'm creating a documentary about the role psychedelics can play to improve well-being, beyond just treating severe illness.",
    "How much do you need to raise (in US dollars)?": 4_000,
    "What will the funds be used for?":
      "This crowdfund will allow us to document Australia's first ethics-approved study on healthy individuals. We've been granted exclusive access to cover this groundbreaking research, which will bring a scientific understanding to the enduring effects of psilocybin on well-being.  We then need to travel to Western Australia to speak to two pharmaceutical companies, and patients undergoing clinical trials.  We also need to pay for a lawyer to write the contracts for universities, pharmaceutical industry and individuals to talk on camera.",
    "What progress have you made?":
      "We've already filmed the first section of the documentary speaking to leading researchers in the psychedelic medicine space. We raised 5k USD from 75 backers on Indiegogo. We're now looking at the broader application of these treatments as a pathway to improve more lives, and to transform the health and wellness of society.",
    "Why are you the right person to make this project?":
      "I believe this story can make a difference in the lives of those suffering from mental health issues. I've  been a filmmaker for 8 years and I've always wanted to create a documentary that can have a significant impact. I've previously made documentaries around science. Unlike traditional media outlets, I'm in the position to offer an independent and balanced approach – between hard science and ancient practices – to an important topic.",
    "Project logo":
      "https://api.typeform.com/responses/files/c4d6c5fe7d733e8ce60fc2834e7851b83000c7c80cb62b33a762d75fe81bcad5/Social_Share.png",
    "Video or image":
      "https://api.typeform.com/responses/files/ebe5552cec39626d5fd1c8bd81102c62645d2b44b5b709413985e00b564dd633/IMG_0001.mov",
  },
  {
    "Owner name": "Randolph Diggs III",
    "Project title": "Degen or Bust",
    "Official link": "http://degenorbust.xyz/",
    Tagline:
      "Lottery on the Blockchain incorporating NFTs as a utility benefit.",
    "Web3 & blockchain": "Yes",
    "Tell us about your project.":
      "Degen or Bust (DoB) is a smart-contract that will run a daily Lottery that's verifiable on-chain via Chainlink VRF V2, our Lottery is similar to your local state Lottery in kind, but differs greatly in degree due to the inherent nature of the blockchain. We have incorporated NFTs into the mix that will aid you in DoB, depending on the rarity of your NFT, you'll receive extra ticket entries for free. This element adds a unique element to the Lottery.",
    "How much do you need to raise (in US dollars)?": 2_500,
    "What will the funds be used for?":
      "I wish to have an audit down by Assure DeFi, they quoted me 1600. The other portion will be used towards marketing.",
    "What progress have you made?":
      "We have raised money, we have a smart contract and a solid team. Please read the white paper https://wp.degenorbust.xyz/ and here's a video that was created by a youtuber name Fire Hustle on our project https://www.youtube.com/watch?v=IrSnWFahnug&t=3s",
    "Why are you the right person to make this project?":
      "I don't think there's anything particular unique about me, my professional back ground is in real estate, I acquired my real estate sales person license here in Texas when I was 18. I have a home construction business called DiggsHomes https://www.instagram.com/diggshomes/ I'm a gamer, I competed at the highest level in Call of Duty for some time. And I'm super into tech, I was ignorant of the Web3 space and just took a deep dive in, absorbed as much knowledge as I could and just got involved. All in all I'm just a guy who wants to make his mark in this space.",
    "Project logo":
      "https://api.typeform.com/responses/files/ccd15a3211d463345b41bd27760e2d77c4b4cca5fe6246df77b3dc6da06c35de/Copy_of_Copy_of_Copy_of_Untitled_Design__2_.png",
    "Video or image":
      "https://api.typeform.com/responses/files/747dfec0a087868029c1ad2c9fa8ed0f4d1eca1969b870fb2278f6cdd4241bd5/clip.mp4",
  },
];
