import { create } from 'zustand'
import { Book, BookCategory } from '@/types/book'

interface BookStore {
  books: Book[]
  categories: BookCategory[]
  selectedBook: Book | null
  isModalOpen: boolean
  hoveredBook: string | null
  
  // Actions
  setBooks: (books: Book[]) => void
  setSelectedBook: (book: Book | null) => void
  setIsModalOpen: (isOpen: boolean) => void
  setHoveredBook: (bookId: string | null) => void
  openBookModal: (book: Book) => void
  closeBookModal: () => void
}

// 书籍分类配置 - 适应放大的书架
export const bookCategories: BookCategory[] = [
  {
    name: '文学小说',
    color: '#8B5CF6', // purple
    position: { y: 3 }
  },
  {
    name: '技术学习',
    color: '#3B82F6', // blue
    position: { y: 1.5 }
  },
  {
    name: '个人成长',
    color: '#10B981', // emerald
    position: { y: 0 }
  }
]

// 初始书籍数据 - 适应放大的书架
export const initialBooks: Book[] = [
  {
    id: 'book1',
    title: '素食者',
    category: '文学小说',
    coverUrl: '/books/book1_suzhizhe/book1_sushizhe.avif',
    markdownPath: '/books/book1_suzhizhe/《素食者》.md',
    tags: ['文学小说', '社会隐喻', '女性文学'],
    position: { x: -4.5, y: 3, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: '#8B5CF6',
    description: '韩江的《素食者》探讨人性与社会边缘问题'
  },
  {
    id: 'book2',
    title: '悉达多',
    category: '文学小说',
    coverUrl: '/books/book2_xidaduo/book2_xidaduo.avif',
    markdownPath: '/books/book2_xidaduo/《悉达多》.md',
    tags: ['哲学', '成长', '自我探索'],
    position: { x: -2.5, y: 3, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: '#8B5CF6'
  },
  {
    id: 'book3',
    title: '且听风吟',
    category: '文学小说',
    coverUrl: '/books/book3_qietingfengyin/book3_qietingfengyin.avif',
    markdownPath: '/books/book3_qietingfengyin/《且听风吟》.md',
    tags: ['村上春树', '青春', '文学'],
    position: { x: -0.5, y: 3, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: '#8B5CF6'
  },
  {
    id: 'book4',
    title: '挪威的森林',
    category: '文学小说',
    coverUrl: '/books/book4_nuoweidesenlin/book4_nuoweidesenlin.avif',
    markdownPath: '/books/book4_nuoweidesenlin/《挪威的森林》.md',
    tags: ['村上春树', '爱情', '青春'],
    position: { x: 1.5, y: 3, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: '#8B5CF6'
  },
  {
    id: 'book5',
    title: '当我谈跑步时我谈些什么',
    category: '个人成长',
    coverUrl: '/books/book5_dangwotanpaobushiwotanxieshenme/book5_dangwotanpaobushiwotanxieshenme.avif',
    markdownPath: '/books/book5_dangwotanpaobushiwotanxieshenme/《当我谈跑步时，我谈些什么》.md',
    tags: ['跑步', '人生感悟', '村上春树'],
    position: { x: -3, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: '#10B981'
  },
  {
    id: 'book6',
    title: 'SQL必知必会',
    category: '技术学习',
    coverUrl: '/books/book6_SQLbizhibihui/book6_SQLbizhibihui.avif',
    markdownPath: '/books/book6_SQLbizhibihui/《SQL必知必会》.md',
    tags: ['SQL', '数据库', '技术'],
    position: { x: -1, y: 1.5, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: '#3B82F6'
  },
  {
    id: 'book7',
    title: '蛤蟆先生去看心理医生',
    category: '个人成长',
    coverUrl: '/books/book7_hamaxainsheng/book7_hamaxiansheng.jpg',
    markdownPath: '/books/book7_hamaxainsheng/《蛤蟆先生去看心理医生》.md',
    tags: ['心理学', '成长', '自我认知'],
    position: { x: -1, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    color: '#10B981'
  }
]

export const useBookStore = create<BookStore>((set, get) => ({
  books: initialBooks,
  categories: bookCategories,
  selectedBook: null,
  isModalOpen: false,
  hoveredBook: null,

  setBooks: (books) => set({ books }),
  
  setSelectedBook: (book) => set({ selectedBook: book }),
  
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  
  setHoveredBook: (bookId) => set({ hoveredBook: bookId }),
  
  openBookModal: (book) => set({ 
    selectedBook: book, 
    isModalOpen: true 
  }),
  
  closeBookModal: () => set({ 
    selectedBook: null, 
    isModalOpen: false 
  })
}))
