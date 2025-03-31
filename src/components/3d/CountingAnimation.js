"use client"
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function CountingHand({ scrollPosition }) {
    const { scene, animations } = useGLTF("/counting_hand.glb"); // Load hand model
    const mixer = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        if (animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            animations.forEach((clip) => mixer.current.clipAction(clip).play());
        }
    }, [animations, scene]);

    useFrame((_, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
        if (modelRef.current) {
            modelRef.current.position.y = -scrollPosition * 2; // Move hand on scroll
        }
    });

    return <primitive object={scene} ref={modelRef} />;
}

function MoneyNotes({ scrollPosition }) {
    const { scene } = useGLTF("/money_notes.glb"); // Load money notes
    const modelRef = useRef(null);

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.position.y = scrollPosition * 3; // Move notes dynamically
        }
    });

    return <primitive object={scene} ref={modelRef} />;
}

export default function MoneyCountingAnimation() {
    const scrollPosition = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            scrollPosition.current = window.scrollY / maxScroll;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />
                <CountingHand scrollPosition={scrollPosition.current} />
                <MoneyNotes scrollPosition={scrollPosition.current} />
            </Canvas>
        </div>
    );
}
