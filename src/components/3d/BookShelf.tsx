import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import Book3D from './Book3D'
import { useBookStore } from '@/store/bookStore'

// 放大的精致书架结构组件
function ShelfStructure() {
  const { categories } = useBookStore()

  return (
    <group scale={[1.5, 1.5, 1.5]}>
      {/* 书架背板 */}
      <mesh position={[0, 1, -0.8]} receiveShadow>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* 书架层板 */}
      {categories.map((category, index) => (
        <group key={category.name}>
          {/* 主层板 */}
          <mesh position={[0, category.position.y - 1.2, -0.3]} receiveShadow castShadow>
            <boxGeometry args={[11.5, 0.15, 1.0]} />
            <meshStandardMaterial
              color="#8B4513"
              roughness={0.7}
              metalness={0.05}
            />
          </mesh>

          {/* 层板前沿装饰 */}
          <mesh position={[0, category.position.y - 1.1, 0.3]} castShadow>
            <boxGeometry args={[11.5, 0.1, 0.08]} />
            <meshStandardMaterial
              color="#A0522D"
              roughness={0.6}
            />
          </mesh>

          {/* 分类标签背景 */}
          <mesh position={[-5.5, category.position.y + 1.2, -0.2]} castShadow>
            <boxGeometry args={[1.5, 0.4, 0.1]} />
            <meshStandardMaterial
              color={category.color}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>

          {/* 分类标签文字 */}
          <Text
            position={[-5.5, category.position.y + 1.2, -0.1]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.008}
            outlineColor="black"
          >
            {category.name}
          </Text>

          {/* 层板支撑 */}
          <mesh position={[-5.7, category.position.y - 0.5, -0.3]} castShadow>
            <boxGeometry args={[0.1, 1.2, 1.0]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
          <mesh position={[5.7, category.position.y - 0.5, -0.3]} castShadow>
            <boxGeometry args={[0.1, 1.2, 1.0]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 书架侧板 */}
      <mesh position={[-6, 1, -0.3]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 6, 1.0]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[6, 1, -0.3]} receiveShadow castShadow>
        <boxGeometry args={[0.3, 6, 1.0]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 书架顶部 */}
      <mesh position={[0, 4.2, -0.3]} receiveShadow castShadow>
        <boxGeometry args={[12, 0.3, 1.0]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>

      {/* 书架底部 */}
      <mesh position={[0, -2.2, -0.3]} receiveShadow>
        <boxGeometry args={[12, 0.3, 1.0]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
    </group>
  )
}

// 精致的3D场景组件
function Scene() {
  const { books } = useBookStore()

  return (
    <>
      {/* 主环境光照 */}
      <ambientLight intensity={0.4} />

      {/* 主要方向光 - 模拟阳光 */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* 补充光源 - 从左侧 */}
      <directionalLight
        position={[-5, 8, 4]}
        intensity={0.6}
        color="#fff8dc"
      />

      {/* 点光源 - 营造温馨氛围 */}
      <pointLight
        position={[0, 4, 3]}
        intensity={0.8}
        color="#ffd700"
        distance={15}
        decay={2}
      />

      {/* 聚光灯 - 突出书架 */}
      <spotLight
        position={[0, 6, 8]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={0.5}
        castShadow
        target-position={[0, 1, 0]}
      />

      {/* 书架结构 */}
      <ShelfStructure />

      {/* 书籍 */}
      {books.map((book, index) => (
        <Book3D key={book.id} book={book} index={index} />
      ))}

      {/* 地面阴影 */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={12}
        blur={2}
        far={4}
        resolution={512}
      />

      {/* 雾效果 - 增加深度感 */}
      <fog attach="fog" args={['#f0f0f0', 15, 25]} />
    </>
  )
}

// 加载中组件
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// 主书架组件
export default function BookShelf() {
  return (
    <motion.div 
      className="w-full h-[600px] bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{
            position: [0, 4, 15],
            fov: 50,
            near: 0.1,
            far: 100
          }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <Scene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={30}
            minPolarAngle={Math.PI / 8}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
            enableDamping={true}
            target={[0, 1.5, 0]}
          />
        </Canvas>
      </Suspense>
    </motion.div>
  )
}
