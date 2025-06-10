"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function RobloxCharacter({ position, color }: { position: [number, number, number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#F4C2A1" />
      </mesh>
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.6, 0.4, 0.3, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.8, 0.5, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#F4C2A1" />
      </mesh>
      <mesh position={[0.8, 0.5, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#F4C2A1" />
      </mesh>
      <mesh position={[-0.3, -0.8, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#2C5F2D" />
      </mesh>
      <mesh position={[0.3, -0.8, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#2C5F2D" />
      </mesh>
    </group>
  )
}

function DangerousPath() {
  const pathRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (pathRef.current) {
      pathRef.current.position.z = ((state.clock.elapsedTime * 0.5) % 20) - 10
    }
  })

  return (
    <group ref={pathRef}>
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={i} position={[0, 0, -i * 4]}>
          <mesh position={[Math.sin(i * 0.8) * 2, -2.8, 0]} rotation={[-Math.PI / 2, 0, Math.sin(i * 0.4) * 0.2]}>
            <planeGeometry args={[3, 2]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.9} emissive="#0A0A0A" emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[Math.sin(i * 0.8) * 2 - 2, -3, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.5, 3, 2]} />
            <meshStandardMaterial color="#0F0F0F" />
          </mesh>
          {i % 2 === 0 && (
            <mesh position={[Math.sin(i * 0.8) * 2 + 1.5, -2.5, 0.5]} rotation={[0, i * 0.4, 0]}>
              <dodecahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
          )}
        </group>
      ))}
    </group>
  )
}

function SinisterMountains() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[-5, 0, -8]}>
        <coneGeometry args={[3, 6, 5]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.9} emissive="#0A0A0A" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[5, 1, -10]}>
        <coneGeometry args={[4, 8, 5]} />
        <meshStandardMaterial color="#0F0F0F" roughness={0.9} emissive="#050505" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, -1, -15]}>
        <coneGeometry args={[6, 10, 6]} />
        <meshStandardMaterial color="#151515" roughness={0.9} emissive="#080808" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, -15, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[20, 20, 20, 32]} />
        <meshStandardMaterial color="#000000" side={THREE.BackSide} emissive="#050505" emissiveIntensity={0.05} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#444444" />
      <pointLight position={[-5, 2, -5]} intensity={0.4} color="#550000" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#330000" target-position={[0, 0, 0]} />
      <fog attach="fog" args={["#000000", 5, 30]} />
      <RobloxCharacter position={[-2, 0, 1]} color="#CE1126" />
      <RobloxCharacter position={[2, 0, 1]} color="#FFD100" />
      <RobloxCharacter position={[0, 0, 2]} color="#007934" />
      <DangerousPath />
      <SinisterMountains />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  )
}

export default function AlBordeDelAbismo() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoKey, setVideoKey] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e))
      }
      setAudioPlaying(!audioPlaying)
    }
  }

  const toggleVideo = () => {
    const newState = !videoPlaying
    setVideoPlaying(newState)
    setVideoKey(prev => prev + 1)
    
    if (newState) {
      // Pequeño retraso para asegurar que el DOM se actualizó
      setTimeout(() => {
        if (videoRef.current) {
          if (videoRef.current) {
            videoRef.current.muted = true 
            videoRef.current.play().catch(e => {
              console.log('Video play failed:', e)
              
              if (videoRef.current) {
                videoRef.current.muted = true
                videoRef.current.play()
              }
            })
          }
        }
      }, 100)
    } else if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handlePlayNow = () => {
    setShowWarning(true)
    setTimeout(() => {
      window.open("https://www.roblox.com/es/games/98982426208675/beta-2", "_blank")
      setShowWarning(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Audio de Savia Andina */}
      <audio
        ref={audioRef}
        loop
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
      >
        <source src="/assets/savia-andina.mp3" type="audio/mpeg" />
      </audio>

      {/* Control de música */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleAudio}
          className="p-3 bg-red-900/20 border border-red-800 rounded-full text-red-400 hover:bg-red-800/30 transition-all"
        >
          {audioPlaying ? '🔊' : '🔇'} {audioPlaying ? 'PAUSAR' : 'MÚSICA'}
        </button>
        <button
          onClick={toggleVideo}
          className="p-3 bg-blue-900/20 border border-blue-800 rounded-full text-blue-400 hover:bg-blue-800/30 transition-all"
        >
          {videoPlaying ? '📺' : '📹'} {videoPlaying ? 'OCULTAR' : 'TRAILER'}
        </button>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-black bg-opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/10 to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/30 to-transparent roadMovement" />
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-transparent lightning" />
      </div>

      <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-red-900 rounded-full floatSlow" />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-800 rounded-full floatSlow2" />
      <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-yellow-900 rounded-full floatSlow3" />

      {showWarning && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <div className="text-center animate-pulse">
            <div className="text-8xl mb-6">💀</div>
            <div className="text-3xl text-red-600 font-black mb-2 glitchText">¡CAMINO DE LA MUERTE!</div>
            <div className="text-xl text-gray-400 mb-2">El sendero más peligroso de Bolivia</div>
            <div className="text-lg text-red-800">Preparando la aventura extrema...</div>
            <div className="mt-4 text-6xl spinSlow">🚴‍♂️</div>
          </div>
        </div>
      )}

      {/* Sección del trailer de video - Versión mejorada */}
      {videoPlaying && (
        <div 
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 p-4"
          onClick={toggleVideo}
        >
          <div 
            className="relative w-full max-w-4xl h-auto vhsEffect"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 border-4 border-red-900/50 rounded-lg pointer-events-none vhsBorder"></div>
            <div className="absolute inset-0 bg-black/20 pointer-events-none vhsNoise"></div>
            <video
              key={videoKey}
              ref={videoRef}
              src="/assets/trailer.mp4"
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-auto rounded-lg vhsGlitch"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-4 text-red-500 font-mono text-sm tracking-wider vhsText">
              ▶ AL BORDE DEL ABISMO - TRAILER OFICIAL
            </div>
            <div className="absolute top-4 right-4">
              <button 
                onClick={toggleVideo}
                className="px-3 py-1 bg-red-900/80 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                CERRAR
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-black mb-4 transition-all duration-1200 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } titleGlow textShadow3D`}
        >
          AL BORDE
        </h1>

        <h2
          className={`text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-red-900 transition-all duration-1200 delay-300 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } abyssGlow textWave`}
        >
          DEL ABISMO
        </h2>

        <h3
          className={`text-2xl md:text-3xl font-bold text-gray-500 mb-8 transition-all duration-1200 delay-500 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } subtitlePulse`}
        >
          🏔️ CAMINO DE LA MUERTE BOLIVIANO 💀
        </h3>

        <div
          className={`w-full h-72 md:h-96 mb-8 transition-all duration-1200 delay-700 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <Canvas camera={{ position: [0, 3, 10], fov: 60 }}>
            <Scene />
          </Canvas>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={toggleVideo}
            className={`group relative px-6 py-3 bg-blue-900/30 border border-blue-700/50 rounded-lg transition-all duration-500 delay-800 transform hover:bg-blue-800/40 hover:scale-105 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
          >
            <span className="flex items-center gap-2 text-blue-400 font-semibold">
              ▶ VER TRAILER OFICIAL
            </span>
          </button>
        </div>

        <p
          className={`text-lg md:text-xl text-red-800 mb-6 font-bold transition-all duration-1200 delay-900 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } warningFlash`}
        >
          ⚠️ LA RUTA MÁS MORTAL DE LOS ANDES ⚠️
        </p>

        <p
          className={`text-base md:text-lg text-gray-600 mb-8 font-semibold transition-all duration-1200 delay-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          🇧🇴 Donde muchos entran, pocos salen - Yungas Extremos 🇧🇴
        </p>

        <button
          onClick={handlePlayNow}
          className={`group relative px-10 py-5 md:px-16 md:py-8 text-xl md:text-2xl font-black text-white rounded-lg transition-all duration-1200 delay-1200 transform hover:scale-110 hover:shadow-2xl ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          } buttonPulse`}
        >
          <span className="relative z-10 flex items-center gap-3">💀 ¡DESAFIAR EL CAMINO! 🏔️</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800 to-red-950 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <div
          className={`mt-6 space-y-2 transition-all duration-1200 delay-1500 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <p className="text-gray-600 text-sm md:text-base">🏔️ Inspirado en el legendario Camino de los Yungas</p>
          <p className="text-gray-700 text-xs md:text-sm">La Paz - Coroico: 300 metros de caída libre al vacío</p>
        </div>

        <div
          className={`mt-4 inline-block px-4 py-2 bg-red-950/20 border-2 border-red-900/50 rounded-lg transition-all duration-1200 delay-1800 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <span className="text-red-800 text-sm font-bold betaFlicker">🚧 VERSIÓN BETA 2 - YUNGAS OSCUROS 🚧</span>
        </div>
      </div>

      <style jsx>{`
        .titleGlow {
          background: linear-gradient(45deg, #8B0000, #880000, #580000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sinisterGlow 3s ease-in-out infinite alternate;
        }
        
        .textShadow3D {
          text-shadow: 0 0 30px rgba(139, 0, 0, 0.8), 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .abyssGlow {
          animation: abyssGlow 2.5s ease-in-out infinite alternate;
        }
        
        .textWave {
          animation: textWave 4s ease-in-out infinite;
        }
        
        .subtitlePulse {
          animation: subtitlePulse 3s ease-in-out infinite;
        }
        
        .warningFlash {
          animation: warningFlash 2s ease-in-out infinite;
        }
        
        .buttonPulse {
          background: linear-gradient(45deg, #8B0000, #550000, #330000);
          box-shadow: 0 0 40px rgba(139, 0, 0, 0.6);
          animation: buttonPulse 2s ease-in-out infinite alternate;
        }
        
        .betaFlicker {
          animation: betaFlicker 1.5s ease-in-out infinite;
        }
        
        .glitchText {
          animation: glitchText 0.5s ease-in-out infinite;
        }
        
        .roadMovement {
          background: repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(30, 30, 30, 0.3) 20px, rgba(30, 30, 30, 0.3) 40px);
          animation: roadMovement 8s linear infinite;
        }
        
        .lightning {
          animation: lightning 10s ease-in-out infinite;
        }
        
        .floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        
        .floatSlow2 {
          animation: floatSlow 6s ease-in-out infinite reverse;
        }
        
        .floatSlow3 {
          animation: floatSlow 10s ease-in-out infinite;
        }
        
        .spinSlow {
          animation: spinSlow 2s linear infinite;
        }
        
        /* Efectos VHS mejorados */
        .vhsEffect {
          box-shadow: 0 0 20px rgba(0, 100, 255, 0.3);
          transform: perspective(500px) rotateX(2deg);
        }
        
        .vhsBorder {
          animation: vhsBorder 0.5s infinite alternate;
          border-image: linear-gradient(45deg, rgba(255,0,0,0.3), rgba(0,100,255,0.3)) 1;
        }
        
        .vhsNoise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
        
        .vhsGlitch {
          animation: vhsGlitch 5s infinite linear;
          filter: brightness(1.05) contrast(1.1);
        }
        
        .vhsText {
          text-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
          animation: vhsText 2s infinite alternate;
          background: rgba(0,0,0,0.5);
          padding: 2px 8px;
          border-radius: 3px;
        }
        
        @keyframes vhsBorder {
          0% { border-color: rgba(255, 0, 0, 0.3); }
          50% { border-color: rgba(0, 100, 255, 0.3); }
          100% { border-color: rgba(0, 255, 100, 0.2); }
        }
        
        @keyframes vhsGlitch {
          0% { filter: hue-rotate(0deg) brightness(1.05) contrast(1.1); transform: translateY(0); }
          20% { filter: hue-rotate(1deg) brightness(1.07) contrast(1.15); transform: translateY(-1px); }
          40% { filter: hue-rotate(-1deg) brightness(1.03) contrast(1.12); transform: translateY(1px); }
          60% { filter: hue-rotate(2deg) brightness(1.08) contrast(1.2); transform: translateY(-2px); }
          80% { filter: hue-rotate(-2deg) brightness(1.05) contrast(1.15); transform: translateY(2px); }
          100% { filter: hue-rotate(0deg) brightness(1.05) contrast(1.1); transform: translateY(0); }
        }
        
        @keyframes vhsText {
          0% { transform: translateX(-1px); opacity: 0.9; }
          50% { transform: translateX(1px); opacity: 1; }
          100% { transform: translateX(-1px); opacity: 0.9; }
        }
        
        @keyframes sinisterGlow {
          0% { text-shadow: 0 0 30px rgba(139, 0, 0, 0.8), 2px 2px 4px rgba(0,0,0,0.8); }
          50% { text-shadow: 0 0 50px rgba(139, 0, 0, 1), 0 0 70px rgba(80, 0, 0, 0.5), 3px 3px 6px rgba(0,0,0,0.9); }
          100% { text-shadow: 0 0 35px rgba(139, 0, 0, 0.9), 2px 2px 4px rgba(0,0,0,0.8); }
        }
        
        @keyframes abyssGlow {
          0% { text-shadow: 0 0 20px rgba(139, 0, 0, 0.6); }
          100% { text-shadow: 0 0 40px rgba(139, 0, 0, 0.9), 0 0 60px rgba(50, 0, 0, 0.4); }
        }
        
        @keyframes textWave {
          0%, 100% { transform: translateY(0) rotateX(0deg); }
          25% { transform: translateY(-2px) rotateX(1deg); }
          75% { transform: translateY(2px) rotateX(-1deg); }
        }
        
        @keyframes subtitlePulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes warningFlash {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.7; }
        }
        
        @keyframes buttonPulse {
          0% { box-shadow: 0 0 40px rgba(139, 0, 0, 0.6); transform: scale(1); }
          100% { box-shadow: 0 0 60px rgba(139, 0, 0, 0.9), 0 0 80px rgba(80, 0, 0, 0.4); transform: scale(1.01); }
        }
        
        @keyframes betaFlicker {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.7; }
        }
        
        @keyframes glitchText {
          0%, 90%, 100% { transform: translateX(0); }
          95% { transform: translateX(2px); }
        }
        
        @keyframes roadMovement {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(100px); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-15px); opacity: 0.8; }
        }
        
        @keyframes lightning {
          0%, 30%, 100% { opacity: 0; }
          31%, 34% { opacity: 0.3; }
          32%, 33% { opacity: 0.8; }
        }
        
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}