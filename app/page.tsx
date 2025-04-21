"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Moon, Sun, Share2, Twitter, Facebook, Linkedin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import Confetti from "react-confetti"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Home() {
  const [name, setName] = useState("")
  const [showError, setShowError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Set window size for confetti
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)

    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  useEffect(() => {
    // Hide confetti after 5 seconds
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const handleNext = () => {
    if (!name.trim()) {
      setShowError(true)
      return
    }
    setShowError(false)
    setShowConfetti(true)
    setShowMessage(true)
  }

  const handleRegisterClick = () => {
    window.open("https://e-cell.in/endeavour", "_blank")
  }

  const shareEvent = (platform) => {
    const eventUrl = "https://e-cell.in/endeavour"
    const secretUrl = "https://endeavour-admin-pannel.vercel.app"
    const shareMessage = `Hey! Check out this secret message from Team Ecell ${secretUrl}`

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}&quote=${encodeURIComponent(shareMessage)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}&summary=${encodeURIComponent(shareMessage)}`
        break
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`
        break
    }

    if (shareUrl) window.open(shareUrl, "_blank")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />
      )}

      <div className="absolute top-4 right-4 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle dark mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <AnimatePresence mode="wait">
        {!showMessage ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
          >
            <motion.h1
              className="text-4xl font-bold text-center text-purple-600 dark:text-purple-400 mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              Hello !
            </motion.h1>
            <motion.p
              className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Enter you name to know a secret 🤫
            </motion.p>
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (showError) setShowError(false)
                  }}
                  className="w-full p-3 text-lg border-2 border-purple-200 dark:border-purple-800 focus:border-purple-400 dark:focus:border-purple-600 rounded-lg"
                />
                {showError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 dark:text-red-400 mt-2"
                  >
                    Please enter your name first
                  </motion.p>
                )}
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={handleNext}
                  className="w-full py-3 text-lg bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  Next <ArrowRight size={18} />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg"
          >
            <div className="flex justify-end mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 size={18} />
                    <span className="sr-only">Share</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => shareEvent("twitter")} className="cursor-pointer">
                    <Twitter className="mr-2 h-4 w-4" />
                    <span>Share on Twitter</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareEvent("facebook")} className="cursor-pointer">
                    <Facebook className="mr-2 h-4 w-4" />
                    <span>Share on Facebook</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareEvent("linkedin")} className="cursor-pointer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    <span>Share on LinkedIn</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => shareEvent("whatsapp")} className="cursor-pointer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>Share on WhatsApp</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">Hey {name}!</h2>

              <p className="text-gray-700 dark:text-gray-300 text-lg">
                Tired of the same old college routine? <span className="font-semibold">ENDEAVOUR by E-Cell</span> is
                your chance to break free and do something epic!
              </p>

              <div className="my-6 p-4 border-l-4 border-purple-500 bg-gray-50 dark:bg-gray-700">
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  We've got <span className="font-bold text-purple-600 dark:text-purple-400">7 awesome events</span>{" "}
                  lined up:
                </p>
                <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>
                    <span className="font-medium">Treasure Hunt</span> - Race across campus for hidden clues and prizes
                  </li>
                  <li>
                    <span className="font-medium">B-Plan</span> - Pitch your billion-dollar idea (or at least pretend
                    you have one)
                  </li>
                  <li>
                    <span className="font-medium">B-Quiz</span> - Show off those business facts you've been hoarding
                  </li>
                  <li>
                    <span className="font-medium">Market Watch</span> - Predict market trends better than your finance
                    professor
                  </li>
                  <li>
                    <span className="font-medium">IPL Mania</span> - Cricket + Business = The perfect Indian combo
                  </li>
                  <li>
                    <span className="font-medium">Corporate Arena</span> - Suit up and solve real-world business
                    challenges
                  </li>
                  <li className="font-semibold text-purple-600 dark:text-purple-400">
                    Hacktrepreneur - Our flagship 24-hour hackathon where coding meets entrepreneurship
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mt-6">Why you'll love it:</h3>

              <div className="space-y-3 my-4 text-gray-700 dark:text-gray-300">
                <p>
                  ✓ <span className="font-medium">Score attendance credit</span> - Miss classes legitimately (your
                  professors actually approve!)
                </p>
                <p>
                  ✓ <span className="font-medium">Beef up your resume</span> - Add some impressive certificates that
                  actually mean something
                </p>
                <p>
                  ✓ <span className="font-medium">Free swag</span> - T-shirts, stickers, and other goodies you'll
                  actually want to keep
                </p>
                <p>
                  ✓ <span className="font-medium">Meet cool people</span> - Connect with students who share your
                  interests (and maybe future co-founders?)
                </p>
                
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg my-6 border-l-4 border-purple-500">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Joining Hacktrepreneur? Here's the VIP treatment:
                </p>
                <ul className="mt-2 text-gray-700 dark:text-gray-300">
                  <li>
                    ✓{" "}
                    <span className="font-bold text-purple-600 dark:text-purple-400">FREE on‑campus accommodation</span>{" "}
                    - No need to worry about late-night commutes
                  </li>
                  <li>✓ All‑night coding session</li>
                  <li>✓ Direct access to mentors from top tech companies</li>
                  <li>✓ Chance to win bigger prizes and potential startup funding</li>
                </ul>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg">
                The best part? You'll have stories to tell that don't involve binge-watching Netflix or cramming for
                exams. Whether you're a coding wizard, a business enthusiast, or just looking for something fun to do,
                ENDEAVOUR has something for you.
              </p>

              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg my-6 text-center">
                <p className="font-bold text-purple-600 dark:text-purple-400 text-lg">
                  Spots are filling up faster than free pizza at a college event!
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">(And yes, we'll have pizza too)</p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 font-medium mb-6">
                Ready to make this semester actually memorable?
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center mb-6">
                <Button
                  onClick={handleRegisterClick}
                  className="px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg"
                >
                  Register Now
                </Button>
              </motion.div>

              <p className="text-gray-700 dark:text-gray-300">
                See you at ENDEAVOUR!
                <br />— The E‑Cell Team
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                P.S. Feel free to share this with your friends. The more, the merrier! (Unless they're your competition,
                then maybe keep it to yourself?)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <Button
                variant="outline"
                onClick={() => {
                  setShowMessage(false)
                  setName("")
                  setShowConfetti(false)
                }}
                className="text-purple-600 dark:text-purple-400 border-purple-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Go back
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
