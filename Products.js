/* ================================================================
   PRODUCT CATALOGUE
   `desc`    -> one short line shown on the product card (grid + cart).
   `details` -> the longer write-up shown in the "view details" modal.
   `image`   -> main card image. `views` -> extra gallery photos.
   Swap the paths for real photos any time — nothing else needs to change.
   ================================================================ */
window.PRODUCTS = [
  {
    id: 'lmp-01', name: 'Alistore Flex 300', price: 170.00, image: 'images/lamp21.jpg',
    desc: 'Adjustable gooseneck lamp with 3 brightness levels, USB-C powered.',
    details: 'Built for small desks and shared rooms, the Flex 300 bends into any angle so the light lands on your page and not your roommate. Three brightness levels cover everything from quick note-checking to a full night of study, and it charges off any USB-C phone charger — no special adapter needed.',
    views: [
      { label: 'Front', image: 'images/lamp22.jpg' },
      { label: 'Side', image: 'images/lamp23.jpg' },
      { label: 'In use', image: 'images/lamp24.jpg' },
      { label: 'In use', image: 'images/lamp25.jpg' }
    ]
  },
  {
    id: 'lmp-02', name: 'LumiVoice Smart Light', price: 85.00, image: 'images/lamp31.jpg',
    desc: 'Voice-controlled LED lamp, plug-and-play with no Wi-Fi needed.',
    details: 'A modern voice-controlled LED lamp designed for effortless convenience. It works plug-and-play with no networking required, supports multiple languages, and lets you adjust brightness and colour simply by speaking. The flexible stand and simple commands make it accessible for everyone, including elderly users, while adding a sleek touch to any room.',
    views: [
      { label: 'Front', image: 'images/lamp32.jpg' },
      { label: 'Side', image: 'images/lamp33.jpg' },
      { label: 'In use', image: 'images/lamp34.jpg' }
    ]
  },
  {
    id: 'lmp-03', name: 'MultiGlow Smart Desk Lamp', price: 200.00, image: 'images/lamp41.jpg',
    desc: 'Smart desk lamp with adjustable brightness and colour temperature.',
    details: 'The MultiGlow Smart Desk Lamp offers fully customisable lighting to suit your needs, from warm evening tones to bright, cool light for focused work. Its sleek design and easy-to-use touch controls provide the perfect ambience for study, work, or relaxation.',
    views: [
      { label: 'Front', image: 'images/lamp42.jpg' },
      { label: 'Side', image: 'images/lamp43.jpg' },
      { label: 'In use', image: 'images/lamp44.jpg' },
      { label: 'In use', image: 'images/lamp45.jpg' }
    ]
  },
  {
    id: 'lmp-04', name: 'VisionLite EyeCare Desk Lamp', price: 320.00, image: 'images/lamp51.jpg',
    desc: 'Eye-care lamp with classroom-grade, full-spectrum lighting.',
    details: 'An advanced study lamp engineered for eye protection and natural illumination. It meets classroom-level lighting standards with full-spectrum Ra97 CRI and stepless dimming, so long study sessions stay comfortable. Intelligent touch controls and multiple modes make it a reliable companion for focused work, and it charges off any USB-C phone charger.',
    views: [
      { label: 'Front', image: 'images/lamp52.jpg' },
      { label: 'Side', image: 'images/lamp53.jpg' },
      { label: 'In use', image: 'images/lamp54.jpg' },
      { label: 'In use', image: 'images/lamp55.jpg' }
    ]
  },
  {
    id: 'lmp-07', name: 'EduGlow Dual Study Lamp', price: 150.00, image: 'images/lamp81.jpg',
    desc: 'Dual-arm lamp with a built-in phone and tablet holder.',
    details: 'A versatile LED desk lamp designed to enhance learning and productivity. Dual adjustable light arms give balanced illumination, while a multifunctional phone or tablet holder built into the base is perfect for online lessons, tutorials, or video calls. Eye-protection lighting keeps sessions comfortable, and the compact footprint suits any desk.',
    views: [
      { label: 'Front', image: 'images/lamp82.jpg' },
      { label: 'Side', image: 'images/lamp83.jpg' },
      { label: 'In use', image: 'images/lamp84.jpg' },
      { label: 'In use', image: 'images/lamp85.jpg' }
    ]
  },
  {
    id: 'lmp-08', name: 'LumoFlex Wooden Accent Lamp', price: 320.00, image: 'images/lamp91.jpg',
    desc: 'Minimalist flexible-neck lamp with warm wooden accents.',
    details: 'A minimalist desk lamp that blends modern functionality with natural charm. Its flexible neck allows precise adjustment for focused lighting, while wooden accents at the top and base add warmth to the sleek white metal body. The sturdy base includes a convenient switch and power cord, making it both stylish and practical for study or work.',
    views: [
      { label: 'Front', image: 'images/lamp91.jpg' }
    ]
  },
  {
    id: 'lmp-09', name: 'StudyLamp Nordic Accent Table Lamp', price: 320.00, image: 'images/lamp101.jpg',
    desc: 'Scandinavian-style lamp with a matte black bell shade.',
    details: 'Brings Scandinavian elegance to your desk with a premium matte black bell shade accented with natural wood. A durable, flexible neck offers smooth adjustability, blending style with focused task lighting. Built for small desks and shared rooms, it charges off any USB-C phone charger — no special adapter needed.',
    views: [
      { label: 'Front', image: 'images/lamp101.jpg' }
    ]
  },
  {
    id: 'lmp-10', name: 'Industrial Heritage Study Lamp', price: 320.00, image: 'images/lamp111.jpg',
    desc: 'Retro industrial lamp with a wide, glare-free diffuser panel.',
    details: 'A timeless blend of retro industrial charm and contemporary style, with an adjustable slate-grey metal shade, a classic curved neck, and a natural wood base with an easy-access toggle switch. Light spreads across a wide diffuser panel instead of a single bulb point, cutting the eye strain that comes from staring at one bright spot for hours. A built-in timer switches the lamp off automatically, useful for winding down after a study session.',
    views: [
      { label: 'Front', image: 'images/lamp111.jpg' }
    ]
  },
  {
    id: 'lmp-11', name: 'Alistore Desk Max', price: 253.00, image: 'images/lamp122.jpg',
    desc: 'Full-size desk lamp with a wireless-charging base.',
    details: 'The flagship full-size desk lamp: a weighted base that doubles as a wireless phone charger, so your phone tops up while you study. A physical dimmer dial gives precise control over brightness instead of stepped settings, letting you match the light exactly to the time of night.',
    views: [
      { label: 'Front', image: 'images/lamp122.jpg' },
      { label: 'Clip', image: 'images/lamp123.jpg' }
    ]
  },
  {
    id: 'lmp-12', name: 'Nordic Horizon Dimmable Floor Lamp', price: 500.00, image: 'images/lamp131.jpg',
    desc: 'Freestanding floor lamp with a fully dimmable frosted shade.',
    details: 'An elegant, freestanding black steel floor lamp with an adjustable top gooseneck and a frosted shade. Fully dimmable to provide the perfect ambient or reading light next to your armchair, bed, or study area — a physical dimmer dial gives precise, stepless control to match the light to the time of night.',
    views: [
      { label: 'Front', image: 'images/lamp132.jpg' },
      { label: 'Base', image: 'images/lamp133.jpg' }
    ]
  },
  {
    id: 'lmp-13', name: 'Foldaway Slim Eye-Protection Lamp', price: 210.00, image: 'images/lamp141.jpg',
    desc: 'Ultra-slim folding lamp with a built-in phone stand.',
    details: 'An ultra-slim, space-saving LED lamp with a dual-hinge design that folds completely flat for easy travel. Advanced eye-protection technology helps prevent strain, and an integrated smartphone stand is built right into the base. A physical dimmer dial gives precise control over brightness to match the light to the time of night.',
    views: [
      { label: 'Front', image: 'images/lamp142.jpg' },
      { label: 'Base', image: 'images/lamp143.jpg' },
      { label: 'Dimmer', image: 'images/lamp144.jpg' }
    ]
  },
  {
    id: 'lmp-14', name: 'Nordic Accent Wooden Table Lamp', price: 320.00, image: 'images/lamp151.jpg',
    desc: 'Scandinavian table lamp with a flexible wooden-accent neck.',
    details: 'Brings Scandinavian elegance to your desk with a premium matte black bell shade accented with natural wood. A durable, flexible neck offers smooth adjustability, blending style with focused task lighting — built for small desks and shared rooms, and it charges off any USB-C phone charger.',
    views: [
      { label: 'Front', image: 'images/lamp152.jpg' },
      { label: 'Base', image: 'images/lamp153.jpg' },
      { label: 'Dimmer', image: 'images/lamp154.jpg' }
    ]
  },
  {
    id: 'lmp-15', name: 'CompactBright Study Lamp', price: 125.00, image: 'images/lamp161.jpg',
    desc: 'Ultra-portable compact lamp perfect for travel and dorm rooms.',
    details: 'Designed for students on the go, the CompactBright offers powerful illumination in a lightweight, portable package. Perfect for dorm rooms, travel, or temporary study spaces, this lamp features adjustable brightness levels and a sturdy weighted base to prevent tipping. USB-C powered for convenient charging.',
    views: [
      { label: 'Side', image: 'images/lamp162.jpg' },
      { label: 'In use', image: 'images/lamp163.jpg' }
    ]
  },
  {
    id: 'lmp-16', name: 'ProGlow Extended Desk Lamp', price: 115.00, image: 'images/lamp201.jpg',
    desc: 'Wide-reach lamp with extended arm for larger work surfaces.',
    details: 'The ProGlow features an extended arm that reaches up to 24 inches, making it ideal for large desks, drafting tables, and workstations. Multiple brightness settings and a flexible neck provide precision lighting for detailed work. The sturdy base keeps everything stable even at full extension.',
    views: [
      { label: 'Extended', image: 'images/lamp202.jpg' },
      { label: 'Side view', image: 'images/lamp203.jpg' },
      { label: 'Front', image: 'images/lamp204.jpg' },
      { label: 'In use', image: 'images/lamp205.jpg' }
    ]
  },
  {
    id: 'lmp-17', name: 'ZenLight Ambient Lamp', price: 125.00, image: 'images/lamp181.jpg',
    desc: 'Warm ambient lighting for relaxation and focus.',
    details: 'The ZenLight combines warm color-temperature lighting with a sleek, minimalist design. Perfect for evening study sessions when you want to reduce blue light exposure. Features stepless dimming to create the perfect ambience for any mood, and integrates seamlessly with any room decor.',
    views: [
      { label: 'Side', image: 'images/lamp182.jpg' },
      { label: 'In use', image: 'images/lamp183.jpg' }
    ]
  },
  {
    id: 'lmp-18', name: 'BrightMax Task Lamp', price: 136.00, image: 'images/lamp191.jpg',
    desc: 'Maximum brightness lamp for intense study sessions.',
    details: 'Built for serious students who need maximum illumination, the BrightMax delivers intense, flicker-free lighting without glare. Professional-grade light output helps reduce eye strain during long study marathons. Thermal management keeps the lamp running cool even during extended use.',
    views: [
      { label: 'Side', image: 'images/lamp192.jpg' },
      { label: 'Dimmer control', image: 'images/lamp193.jpg' }
    ]
  },
  {
    id: 'lmp-19', name: 'ClipOn Portable Study Lamp', price: 180.00, image: 'images/lamp171.jpg',
    desc: 'Versatile clip-on lamp for any surface or shelf.',
    details: 'The ClipOn adapts to your workspace with its universal clipping mechanism, fitting shelves, desk edges, or headboards securely. Fully adjustable with 360-degree rotation, this lamp maximizes space efficiency. Three brightness levels ensure comfortable lighting in any environment.',
    views: [
      { label: 'Clipped to desk', image: 'images/lamp172.jpg' },
      { label: 'Rotated view', image: 'images/lamp173.jpg' },
      { label: 'Side profile', image: 'images/lamp174.jpg' },
      { label: 'In use', image: 'images/lamp175.jpg' }
    ]
  }
];
    