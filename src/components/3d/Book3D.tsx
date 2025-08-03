import { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { Book } from '@/types/book'
import { useBookStore } from '@/store/bookStore'

interface Book3DProps {
  book: Book
  index: number
}

export default function Book3D({ book, index }: Book3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [coverTexture, setCoverTexture] = useState<THREE.Texture | null>(null)
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null)
  const { hoveredBook, setHoveredBook, openBookModal } = useBookStore()

  const isHovered = hoveredBook === book.id || hovered

  // 书籍尺寸 - 放大以便更好展示
  const bookWidth = 0.8
  const bookHeight = 1.2
  const bookDepth = 0.12

  // 加载书籍封面纹理
  useEffect(() => {
    const loader = new THREE.TextureLoader()

    // 设置跨域
    loader.setCrossOrigin('anonymous')

    // 加载封面
    loader.load(
      book.coverUrl,
      (loadedTexture) => {
        // 设置纹理参数 - 修复上下颠倒问题
        loadedTexture.flipY = true  // 改为true来修复上下颠倒
        loadedTexture.wrapS = THREE.ClampToEdgeWrapping
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping
        loadedTexture.minFilter = THREE.LinearFilter
        loadedTexture.magFilter = THREE.LinearFilter
        loadedTexture.generateMipmaps = false

        console.log(`Successfully loaded cover texture for ${book.title}`)
        setCoverTexture(loadedTexture)
      },
      (progress) => {
        console.log(`Loading progress for ${book.title}:`, progress)
      },
      (error) => {
        console.error(`Failed to load cover texture for ${book.title}:`, error)
        console.log(`Attempted to load: ${book.coverUrl}`)
      }
    )

    // 创建书籍背面纹理（简单的颜色）
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 768
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // 创建渐变背景
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, book.color)
      gradient.addColorStop(1, `${book.color}CC`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 添加装饰边框
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 4
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)

      // 添加书名
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(book.title, canvas.width / 2, canvas.height / 2)

      const backTex = new THREE.CanvasTexture(canvas)
      backTex.flipY = true  // 修复背面纹理的翻转
      backTex.wrapS = THREE.ClampToEdgeWrapping
      backTex.wrapT = THREE.ClampToEdgeWrapping
      setBackTexture(backTex)
    }
  }, [book.coverUrl, book.title, book.color])

  // 动画效果
  useFrame((state) => {
    if (groupRef.current) {
      if (isHovered) {
        // 悬浮时轻微倾斜和上升
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.1, 0.1)
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0.2, 0.1)
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, book.position.y + 0.3, 0.1)
      } else {
        // 正常状态的轻微浮动
        const time = state.clock.elapsedTime
        groupRef.current.rotation.x = Math.sin(time * 0.5 + index) * 0.02
        groupRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.03
        groupRef.current.position.y = book.position.y + Math.sin(time * 0.4 + index) * 0.02
      }
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    setHoveredBook(book.id)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    setHoveredBook(null)
    document.body.style.cursor = 'auto'
  }

  const handleClick = () => {
    openBookModal(book)
  }

  return (
    <group
      ref={groupRef}
      position={[book.position.x, book.position.y, book.position.z]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      scale={isHovered ? 1.05 : 1}
    >
      {/* 书籍主体 */}
      <group>
        {/* 书籍封面 */}
        <mesh
          position={[0, 0, bookDepth / 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[bookWidth, bookHeight, 0.01]} />
          <meshStandardMaterial
            map={coverTexture}
            color={coverTexture ? '#ffffff' : book.color}
            roughness={coverTexture ? 0.3 : 0.5}
            metalness={0.05}
            transparent={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* 书籍背面 */}
        <mesh
          position={[0, 0, -bookDepth / 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[bookWidth, bookHeight, 0.01]} />
          <meshStandardMaterial
            map={backTexture}
            color={backTexture ? '#ffffff' : book.color}
            roughness={0.4}
            metalness={0.05}
            transparent={false}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* 书脊 */}
        <mesh
          position={[-bookWidth / 2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[bookDepth, bookHeight, 0.01]} />
          <meshStandardMaterial
            color={book.color}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* 书籍右侧 */}
        <mesh
          position={[bookWidth / 2, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[bookDepth, bookHeight, 0.01]} />
          <meshStandardMaterial
            color={book.color}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* 书籍顶部 */}
        <mesh
          position={[0, bookHeight / 2, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[bookWidth, bookDepth, 0.01]} />
          <meshStandardMaterial
            color={book.color}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* 书籍底部 */}
        <mesh
          position={[0, -bookHeight / 2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[bookWidth, bookDepth, 0.01]} />
          <meshStandardMaterial
            color={book.color}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* 书页效果 */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[bookWidth - 0.04, bookHeight - 0.04, bookDepth - 0.02]} />
          <meshStandardMaterial
            color="#f8f8f8"
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>
      </group>

      {/* 书脊文字 */}
      <Text
        position={[-bookWidth / 2 + 0.02, 0, 0]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={bookHeight - 0.2}
        textAlign="center"
        outlineWidth={0.003}
        outlineColor="black"
      >
        {book.title}
      </Text>

      {/* 悬浮时的效果 */}
      {isHovered && (
        <>
          {/* 光晕效果 */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[bookWidth + 0.1, bookHeight + 0.1, bookDepth + 0.1]} />
            <meshBasicMaterial
              color={book.color}
              transparent
              opacity={0.1}
            />
          </mesh>

          {/* 悬浮标签 */}
          <group position={[0, bookHeight / 2 + 0.3, 0]}>
            <mesh>
              <boxGeometry args={[Math.min(book.title.length * 0.08 + 0.2, 2), 0.2, 0.02]} />
              <meshBasicMaterial
                color="white"
                transparent
                opacity={0.95}
              />
            </mesh>
            <Text
              position={[0, 0, 0.02]}
              fontSize={0.06}
              color="black"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.8}
              textAlign="center"
            >
              {book.title}
            </Text>
          </group>
        </>
      )}
    </group>
  )
}
