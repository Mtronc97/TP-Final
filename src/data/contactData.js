const contacts = [
  {
    id: 1,
    name: 'Tony Stark',
    last_time_connection: 'Hace 5 min',
    profile_picture: 'https://i.redd.it/x8aaxbjh8r6a1.jpg',
    messages: [
      {
        id: 1,
        text: 'Chicos, ¿lista la tech para el sábado? Iron Man necesita una prueba de vuelo. 🛡️',
        send_by_me: true,
        created_at: '2026-03-17T09:12:00Z',
        is_read: true
      },
      {
        id: 2,
        text: 'Perfecto. Traigo una nueva armadura y unas energías para la trivia. ⚡',
        send_by_me: false,
        created_at: '2026-03-17T09:15:00Z',
        is_read: true
      },
      {
        id: 3,
        text: 'Ah, y no olviden que la misión incluye un desafío de estrategia. 🧠',
        send_by_me: true,
        created_at: '2026-03-17T09:17:00Z',
        is_read: false
      }
    ]
  },
  {
    id: 2,
    name: 'Natasha Romanoff',
    last_time_connection: 'Hace 1 hora',
    profile_picture: 'https://pbs.twimg.com/profile_images/1285108175478206464/Q8bOeDQB_400x400.jpg',
    messages: [
      {
        id: 1,
        text: 'Ya llevo unas tapas especiales y snacks para el equipo. 🥷',
        send_by_me: true,
        created_at: '2026-03-16T20:30:00Z',
        is_read: true
      },
      {
        id: 2,
        text: 'Perfecto. Yo llevo la linterna táctica y unas sorpresas para el final. 🔦',
        send_by_me: false,
        created_at: '2026-03-16T20:32:00Z',
        is_read: true
      },
      {
        id: 3,
        text: 'Genial. Si alguien puede traer mantas, mejor: el plan incluye una parte nocturna. 🌙',
        send_by_me: true,
        created_at: '2026-03-16T20:35:00Z',
        is_read: false
      }
    ]
  },
  {
    id: 3,
    name: 'Bruce Banner',
    last_time_connection: 'Ahora mismo',
    profile_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYjE3dY4z2YzdBeuhCJclLRTyDSxkFOfYwRQ&s',
    messages: [
      {
        id: 1,
        text: 'Puedo traer juegos de mesa (menos explosivos). 😅',
        send_by_me: true,
        created_at: '2026-03-17T10:05:00Z',
        is_read: true
      },
      {
        id: 2,
        text: 'Genial, y yo trato de mantener la calma hasta el final de la noche. 💚',
        send_by_me: false,
        created_at: '2026-03-17T10:07:00Z',
        is_read: false
      },
      {
        id: 3,
        text: 'Avisen si necesitan algo de química (solo la buena). 🧪',
        send_by_me: true,
        created_at: '2026-03-17T10:08:00Z',
        is_read: false
      }
    ]
  },
  {
    id: 4,
    name: 'Steve Rogers',
    last_time_connection: 'Hace 2 horas',
    profile_picture: 'https://m.media-amazon.com/images/M/MV5BMTUwNjU5MDMzMF5BMl5BanBnXkFtZTcwNjM3OTY3Nw@@._V1_.jpg',
    messages: [
      {
        id: 1,
        text: '¿Alguien puede encargarse de las mantas? Yo traigo unos sándwiches de energía. 🇺🇸',
        send_by_me: true,
        created_at: '2026-03-17T09:55:00Z',
        is_read: true
      },
      {
        id: 2,
        text: 'Perfecto, yo me ocupo de la música mientras ustedes arman el campamento. 🎶',
        send_by_me: false,
        created_at: '2026-03-17T09:58:00Z',
        is_read: true
      },
      {
        id: 3,
        text: 'Listo, ya reuní al equipo. Solo falta que lleguen los últimos. 💪',
        send_by_me: true,
        created_at: '2026-03-17T10:00:00Z',
        is_read: false
      }
    ]
  },
  {
    id: 5,
    name: 'Thor Odinson',
    last_time_connection: 'Hace 30 min',
    profile_picture: 'https://i.pinimg.com/564x/46/c3/04/46c3047bcdf1a8f6fec8a4aa1f354c07.jpg',
    messages: [
      {
        id: 1,
        text: 'Traje el martillo. ¿Quién se anima a probarlo en el parque? ⚡',
        send_by_me: true,
        created_at: '2026-03-17T09:45:00Z',
        is_read: true
      },
      {
        id: 2,
        text: 'No olviden el asado. El trueno pide carne. 🥩',
        send_by_me: false,
        created_at: '2026-03-17T09:48:00Z',
        is_read: true
      },
      {
        id: 3,
        text: 'Juntada confirmada. Soy el guardián de las selfies. 📸',
        send_by_me: true,
        created_at: '2026-03-17T09:50:00Z',
        is_read: false
      }
    ]
  },
  {
    id: 6,
    name: 'Clint Barton',
    last_time_connection: 'Hace 10 min',
    profile_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAqKBkS4i03OthyDHsliZpY28XI5CMFpEBDQ&s',
    messages: [
      {
        id: 1,
        text: 'Llevo la flecha lumínica y unas galletas para el camino. 🎯',
        send_by_me: true,
        created_at: '2026-03-17T10:10:00Z',
        is_read: true
      },
      {
        id: 2,
        text: '¿Alguien trae algo de café? Voy a necesitar energía para jugar. ☕',
        send_by_me: false,
        created_at: '2026-03-17T10:12:00Z',
        is_read: true
      },
      {
        id: 3,
        text: 'Perfecto, así me despierto luego de las siestas. 😴',
        send_by_me: true,
        created_at: '2026-03-17T10:14:00Z',
        is_read: false
      }
    ]
  },
  {
    id: 7,
    name: 'Grupo: Avengers Assemble',
    last_time_connection: 'Hace 2 min',
    profile_picture: 'https://lumiere-a.akamaihd.net/v1/images/the_avengers_001_ef260f78.jpeg?region=0,0,540,304',
    messages: [
      {
        id: 1,
        text: 'Confirmamos la base en el parque para el sábado a las 16:00?',
        send_by_me: false,
        authorName: 'Tony Stark',
        authorAvatar: 'https://i.redd.it/x8aaxbjh8r6a1.jpg',
        created_at: '2026-03-17T09:18:00Z',
        is_read: true
      },
      {
        id: 2,
        text: 'Llevo los snacks y la linterna táctica.',
        send_by_me: false,
        authorName: 'Natasha Romanoff',
        authorAvatar: 'https://pbs.twimg.com/profile_images/1285108175478206464/Q8bOeDQB_400x400.jpg',
        created_at: '2026-03-17T09:19:00Z',
        is_read: true
      },
      {
        id: 3,
        text: 'Puedo traer juegos y algunas mantas. 💚',
        send_by_me: false,
        authorName: 'Bruce Banner',
        authorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYjE3dY4z2YzdBeuhCJclLRTyDSxkFOfYwRQ&s',
        created_at: '2026-03-17T09:20:00Z',
        is_read: true
      },
      {
        id: 4,
        text: 'Yo llevo los sándwiches de energía y voy a ser el DJ. 🎧',
        send_by_me: false,
        authorName: 'Steve Rogers',
        authorAvatar: 'https://m.media-amazon.com/images/M/MV5BMTUwNjU5MDMzMF5BMl5BanBnXkFtZTcwNjM3OTY3Nw@@._V1_.jpg',
        created_at: '2026-03-17T09:21:00Z',
        is_read: true
      },
      {
        id: 5,
        text: 'Traje el martillo y la actitud. ⚡',
        send_by_me: false,
        authorName: 'Thor Odinson',
        authorAvatar: 'https://i.pinimg.com/564x/46/c3/04/46c3047bcdf1a8f6fec8a4aa1f354c07.jpg',
        created_at: '2026-03-17T09:22:00Z',
        is_read: true
      },
      {
        id: 6,
        text: 'Galletas listas, café en camino. ☕',
        send_by_me: false,
        authorName: 'Clint Barton',
        authorAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAqKBkS4i03OthyDHsliZpY28XI5CMFpEBDQ&s',
        created_at: '2026-03-17T09:23:00Z',
        is_read: true
      },
      {
        id: 7,
        text: 'Perfecto, ya puedo ver la reunión de héroes. Nos vemos en el parque. 🛡️',
        send_by_me: true,
        created_at: '2026-03-17T09:25:00Z',
        is_read: false
      }
    ]
  }
]

export default contacts
