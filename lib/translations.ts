import { Locale } from './i18n';

const translations: Record<Locale, Record<string, any>> = {
  es: {
    nav: {
      inicio: 'Inicio',
      lugar: 'El Lugar',
      eventos: 'Eventos',
      galeria: 'Galería',
      faq: 'FAQ',
      contacto: 'Contacto',
    },
    hero: {
      title: 'Chacra La Peregrina',
      subtitle: 'Donde la laguna encuentra tu próximo evento',
      cta: 'Consultar Disponibilidad',
    },
    values: {
      title: 'Una experiencia única',
      subtitle: 'Tres razones para elegir La Peregrina',
      items: [
        { title: '7 Hectáreas de Naturaleza Viva', desc: 'Un ecosistema donde conviven carpinchos, jabalíes, zorros y aves. Aquí la naturaleza no es un decorado — es la anfitriona.', icon: 'leaf' },
        { title: 'Quincho Premium Frente a la Laguna', desc: 'Parrillero profesional de piedra, cocina equipada, baño completo, mobiliario y sombrillas. Todo con vista a la Laguna del Sauce.', icon: 'flame' },
        { title: 'Piscina con Vista Infinita', desc: 'Atardeceres que se reflejan en el agua creando un espectáculo irrepetible. Tu evento con el cielo como lienzo.', icon: 'waves' },
      ],
    },
    gallery: {
      title: 'Descubrí La Peregrina',
      subtitle: 'Cada rincón cuenta una historia',
    },
    venue: {
      title: 'El Lugar',
      subtitle: 'Donde cada detalle importa',
      quincho: { title: 'Parrillero & Quincho', desc: 'Construido íntegramente en ladrillo visto con techo de madera y tejas. Parrillero profesional de piedra, cocina equipada, baño completo, mesas, sofás y sombrillas. Espacios cubiertos y semicubiertos para cualquier clima.' },
      piscina: { title: 'Piscina Privada', desc: 'Vista directa a la Laguna del Sauce. Rodeada de reposeras de madera y deck amplio. El escenario perfecto para cócteles al atardecer o eventos diurnos inolvidables.' },
      naturaleza: { title: 'Naturaleza & Fauna', desc: 'Carpinchos, jabalíes, zorros y una rica diversidad de aves conviven libremente en las 7 hectáreas. Cielos estrellados sin contaminación lumínica. Pinos y eucaliptos enmarcan cada vista.' },
    },
    events: {
      title: 'Tu Evento, Tu Estilo',
      subtitle: 'Cada celebración es única — y así la tratamos',
      types: [
        { title: 'Bodas Íntimas', desc: 'Decí "sí" con la laguna como testigo y un atardecer pintando el cielo. Cada detalle cuidado con esmero en un entorno que suma magia natural.', icon: 'heart' },
        { title: 'Retiros Corporativos', desc: 'Lejos del ruido, cerca de las ideas. Team building, jornadas creativas o presentaciones en un espacio que inspira y conecta equipos.', icon: 'briefcase' },
        { title: 'Celebraciones Familiares', desc: 'Cumpleaños, aniversarios o un reencuentro especial. Piscina, parrillero y el campo como patio de juegos para grandes y chicos.', icon: 'cake' },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        { q: '¿Se puede hacer música en vivo?', a: 'Sí, la música en vivo es bienvenida. Respetamos el entorno natural y la fauna local, por lo que pedimos volumen moderado. DJ y amplificación están permitidos con estas consideraciones.' },
        { q: '¿Hay animales en el lugar?', a: 'Sí, y es parte de la magia. La Peregrina es un ecosistema vivo. Es común avistar carpinchos, jabalíes, zorros y diversas aves. Estos encuentros hacen cada evento verdaderamente único.' },
        { q: '¿Incluye alojamiento?', a: 'Próximamente. Hay excelentes opciones de hospedaje en Punta del Este y alrededores, a pocos minutos de La Peregrina.' },
        { q: '¿Cómo llego?', a: 'La Peregrina se ubica en El Pejerrey, sobre la Laguna del Sauce. Acceso por camino rural en buen estado, a minutos del Aeropuerto de Laguna del Sauce y de Punta del Este.' },
        { q: '¿Cuánto cuesta?', a: 'Cada evento es único y lo cotizamos de forma personalizada. Contactanos y armamos una propuesta a tu medida.' },
        { q: '¿Puedo visitar antes de reservar?', a: 'Por supuesto. Agendá una visita y conocé el lugar en persona. Es la mejor forma de sentir la energía de La Peregrina.' },
      ],
    },
    contact: {
      title: 'Hagamos que suceda',
      subtitle: 'Contanos tu idea y la hacemos realidad',
      form: {
        name: 'Nombre completo',
        email: 'Correo electrónico',
        phone: 'Teléfono (opcional)',
        eventType: 'Tipo de evento',
        eventTypes: ['Boda', 'Evento Corporativo', 'Reunión Familiar', 'Cumpleaños', 'Otro'],
        eventDate: 'Fecha tentativa',
        guestCount: 'Cantidad de invitados (aprox.)',
        message: 'Contanos sobre tu evento',
        submit: 'Enviar Consulta',
        sending: 'Enviando...',
        success: '¡Consulta enviada! Te responderemos a la brevedad.',
        error: 'Error al enviar. Por favor, intentá de nuevo.',
      },
      location: 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguay',
      mapLink: 'Abrir en Google Maps',
    },
    footer: {
      tagline: 'Eventos exclusivos en armonía con la naturaleza',
      location: 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguay',
      rights: 'Todos los derechos reservados',
    },
  },
  en: {
    nav: {
      inicio: 'Home',
      lugar: 'The Venue',
      eventos: 'Events',
      galeria: 'Gallery',
      faq: 'FAQ',
      contacto: 'Contact',
    },
    hero: {
      title: 'Chacra La Peregrina',
      subtitle: 'Where the lagoon meets your next event',
      cta: 'Check Availability',
    },
    values: {
      title: 'A Unique Experience',
      subtitle: 'Three reasons to choose La Peregrina',
      items: [
        { title: '7 Hectares of Living Nature', desc: 'An ecosystem where capybaras, wild boar, foxes, and birds coexist freely. Here, nature is not a backdrop — it is the host.', icon: 'leaf' },
        { title: 'Premium Quincho on the Lagoon', desc: 'Professional stone barbecue, equipped kitchen, full bathroom, furniture and umbrellas. All with views of Laguna del Sauce.', icon: 'flame' },
        { title: 'Pool with Infinite Views', desc: 'Sunsets that reflect on the water creating an unrepeatable spectacle. Your event with the sky as a canvas.', icon: 'waves' },
      ],
    },
    gallery: {
      title: 'Discover La Peregrina',
      subtitle: 'Every corner tells a story',
    },
    venue: {
      title: 'The Venue',
      subtitle: 'Where every detail matters',
      quincho: { title: 'Barbecue & Quincho', desc: 'Built entirely in exposed brick with wooden roof and tiles. Professional stone barbecue, equipped kitchen, full bathroom, tables, sofas and umbrellas. Covered and semi-covered spaces for any weather.' },
      piscina: { title: 'Private Pool', desc: 'Direct views of Laguna del Sauce. Surrounded by wooden loungers and a spacious deck. The perfect setting for sunset cocktails or unforgettable daytime events.' },
      naturaleza: { title: 'Nature & Wildlife', desc: 'Capybaras, wild boar, foxes, and a rich diversity of birds roam freely across 7 hectares. Light-pollution-free starry skies. Pines and eucalyptus frame every view.' },
    },
    events: {
      title: 'Your Event, Your Style',
      subtitle: 'Every celebration is unique — and we treat it that way',
      types: [
        { title: 'Intimate Weddings', desc: 'Say "I do" with the lagoon as your witness and a sunset painting the sky. Every detail crafted with care in a setting that adds natural magic.', icon: 'heart' },
        { title: 'Corporate Retreats', desc: 'Away from the noise, close to ideas. Team building, creative workshops, or presentations in a space that inspires and connects teams.', icon: 'briefcase' },
        { title: 'Family Celebrations', desc: 'Birthdays, anniversaries, or a special reunion. Pool, barbecue, and the countryside as a playground for all ages.', icon: 'cake' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'Is live music allowed?', a: 'Yes, live music is welcome. We respect the natural environment and local wildlife, so we ask for moderate volume levels. DJs and amplification are permitted with these considerations.' },
        { q: 'Are there animals on the property?', a: 'Yes, and it\'s part of the magic. La Peregrina is a living ecosystem. It\'s common to spot capybaras, wild boar, foxes, and various bird species. These encounters make every event truly unique.' },
        { q: 'Does the venue include accommodation?', a: 'Coming soon. There are excellent lodging options in Punta del Este and surrounding areas, just minutes from La Peregrina.' },
        { q: 'How do I get there?', a: 'La Peregrina is in El Pejerrey, on Laguna del Sauce. Access via a well-maintained rural road, minutes from the Laguna del Sauce Airport and Punta del Este.' },
        { q: 'How much does it cost?', a: 'Every event is unique and we quote on a personalized basis. Contact us and we\'ll craft a proposal tailored to you.' },
        { q: 'Can I visit before booking?', a: 'Of course. Schedule a visit and experience the place in person. It\'s the best way to feel the energy of La Peregrina.' },
      ],
    },
    contact: {
      title: 'Let\'s Make It Happen',
      subtitle: 'Tell us your idea and we\'ll bring it to life',
      form: {
        name: 'Full name',
        email: 'Email address',
        phone: 'Phone (optional)',
        eventType: 'Event type',
        eventTypes: ['Wedding', 'Corporate Event', 'Family Gathering', 'Birthday', 'Other'],
        eventDate: 'Tentative date',
        guestCount: 'Approximate number of guests',
        message: 'Tell us about your event',
        submit: 'Send Inquiry',
        sending: 'Sending...',
        success: 'Inquiry sent! We\'ll get back to you shortly.',
        error: 'Error sending. Please try again.',
      },
      location: 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguay',
      mapLink: 'Open in Google Maps',
    },
    footer: {
      tagline: 'Exclusive events in harmony with nature',
      location: 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguay',
      rights: 'All rights reserved',
    },
  },
  pt: {
    nav: {
      inicio: 'Início',
      lugar: 'O Lugar',
      eventos: 'Eventos',
      galeria: 'Galeria',
      faq: 'FAQ',
      contacto: 'Contato',
    },
    hero: {
      title: 'Chacra La Peregrina',
      subtitle: 'Onde a lagoa encontra o seu próximo evento',
      cta: 'Consultar Disponibilidade',
    },
    values: {
      title: 'Uma Experiência Única',
      subtitle: 'Três razões para escolher La Peregrina',
      items: [
        { title: '7 Hectares de Natureza Viva', desc: 'Um ecossistema onde capivaras, javalis, raposas e aves convivem livremente. Aqui a natureza não é cenário — é a anfitriã.', icon: 'leaf' },
        { title: 'Quincho Premium à Beira da Lagoa', desc: 'Churrasqueira profissional de pedra, cozinha equipada, banheiro completo, mobiliário e guarda-sóis. Tudo com vista para a Laguna del Sauce.', icon: 'flame' },
        { title: 'Piscina com Vista Infinita', desc: 'Pores do sol que se refletem na água criando um espetáculo irrepetível. Seu evento com o céu como tela.', icon: 'waves' },
      ],
    },
    gallery: {
      title: 'Descubra La Peregrina',
      subtitle: 'Cada canto conta uma história',
    },
    venue: {
      title: 'O Lugar',
      subtitle: 'Onde cada detalhe importa',
      quincho: { title: 'Churrasqueira & Quincho', desc: 'Construído inteiramente em tijolo aparente com telhado de madeira e telhas. Churrasqueira profissional de pedra, cozinha equipada, banheiro completo, mesas, sofás e guarda-sóis. Espaços cobertos e semicobertos.' },
      piscina: { title: 'Piscina Privada', desc: 'Vista direta para a Laguna del Sauce. Cercada por espreguiçadeiras de madeira e deck amplo. O cenário perfeito para coquetéis ao pôr do sol ou eventos diurnos inesquecíveis.' },
      naturaleza: { title: 'Natureza & Fauna', desc: 'Capivaras, javalis, raposas e uma rica diversidade de aves vivem livremente nos 7 hectares. Céus estrelados sem poluição luminosa. Pinheiros e eucaliptos emolduram cada vista.' },
    },
    events: {
      title: 'Seu Evento, Seu Estilo',
      subtitle: 'Cada celebração é única — e assim a tratamos',
      types: [
        { title: 'Casamentos Íntimos', desc: 'Diga "sim" com a lagoa como testemunha e um pôr do sol pintando o céu. Cada detalhe cuidado com esmero num cenário que soma magia natural.', icon: 'heart' },
        { title: 'Retiros Corporativos', desc: 'Longe do barulho, perto das ideias. Team building, jornadas criativas ou apresentações num espaço que inspira e conecta equipes.', icon: 'briefcase' },
        { title: 'Celebrações Familiares', desc: 'Aniversários ou um reencontro especial. Piscina, churrasqueira e o campo como quintal para grandes e pequenos.', icon: 'cake' },
      ],
    },
    faq: {
      title: 'Perguntas Frequentes',
      items: [
        { q: 'Pode ter música ao vivo?', a: 'Sim, música ao vivo é bem-vinda. Respeitamos o ambiente natural e a fauna local, então pedimos volume moderado. DJ e amplificação são permitidos com essas considerações.' },
        { q: 'Há animais no local?', a: 'Sim, e faz parte da magia. La Peregrina é um ecossistema vivo. É comum avistar capivaras, javalis, raposas e diversas aves. Esses encontros tornam cada evento verdadeiramente único.' },
        { q: 'Inclui hospedagem?', a: 'Em breve. Há excelentes opções de hospedagem em Punta del Este e arredores, a poucos minutos de La Peregrina.' },
        { q: 'Como chegar?', a: 'La Peregrina fica em El Pejerrey, na Laguna del Sauce. Acesso por estrada rural em bom estado, a poucos minutos do aeroporto e de Punta del Este.' },
        { q: 'Quanto custa?', a: 'Cada evento é único e orçamos de forma personalizada. Entre em contato e montamos uma proposta sob medida.' },
        { q: 'Posso visitar antes de reservar?', a: 'Claro. Agende uma visita e conheça o lugar pessoalmente. É a melhor forma de sentir a energia de La Peregrina.' },
      ],
    },
    contact: {
      title: 'Vamos Fazer Acontecer',
      subtitle: 'Conte-nos sua ideia e a tornamos realidade',
      form: {
        name: 'Nome completo',
        email: 'E-mail',
        phone: 'Telefone (opcional)',
        eventType: 'Tipo de evento',
        eventTypes: ['Casamento', 'Evento Corporativo', 'Reunião Familiar', 'Aniversário', 'Outro'],
        eventDate: 'Data tentativa',
        guestCount: 'Número aproximado de convidados',
        message: 'Conte-nos sobre seu evento',
        submit: 'Enviar Consulta',
        sending: 'Enviando...',
        success: 'Consulta enviada! Retornaremos em breve.',
        error: 'Erro ao enviar. Por favor, tente novamente.',
      },
      location: 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguai',
      mapLink: 'Abrir no Google Maps',
    },
    footer: {
      tagline: 'Eventos exclusivos em harmonia com a natureza',
      location: 'El Pejerrey, Laguna del Sauce · Punta del Este, Uruguai',
      rights: 'Todos os direitos reservados',
    },
  },
};

export function getTranslations(locale: Locale): Record<string, any> {
  return translations[locale] ?? translations.es;
}

export function t(locale: Locale, path: string): any {
  const keys = path?.split('.') ?? [];
  let result: any = translations[locale] ?? translations.es;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return path;
  }
  return result ?? path;
}
