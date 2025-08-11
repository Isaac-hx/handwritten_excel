'use client'
import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Heart, Star, Sparkles, FileText, Image, Music, Video, Archive, CheckCircle, X, Loader } from 'lucide-react'
import chatWithGemini from '@/services/gemini'
import { convertCsvToExcel } from '@/helper/convertToExcel'
import extractCSVSection from '@/helper/cleanText'


export default function CuteFileUploader() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [loading,setLoading] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [handleFiles])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          console.log(files[0])
          const imageToUrl = URL.createObjectURL(files[0])
          setImageUrl(imageToUrl)
          setUploadedFiles(prev => [...prev, files[0].name])
          return 100
        }
        return prev + 10
      })
    }, 200)
    console.log(uploadedFiles)
  }
  const handleDeleteImage = ()=>{
    setImageUrl("")
    setUploadedFiles([])
  }

  const handleSubmitFile = async()=>{
    setLoading(true)
    try{
      console.log(imageUrl)
      const response = await chatWithGemini(imageUrl)
      if (response) {
        const dataExtract = extractCSVSection(response)
        convertCsvToExcel(dataExtract)
      }

    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }

  }
  const fileIcons = {
    image: <Image className="w-6 h-6 text-pink-500" />,
    document: <FileText className="w-6 h-6 text-blue-500" />,
    music: <Music className="w-6 h-6 text-purple-500" />,
    video: <Video className="w-6 h-6 text-red-500" />,
    archive: <Archive className="w-6 h-6 text-yellow-500" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-12 h-12 animate-spin text-pink-500" />
            <span className="text-white text-lg font-semibold">Processing...</span>
          </div>
        </div>
      )}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700 border-pink-200">
                    ✨ Text handwritten to excel
                  </Badge>
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Upload your files with
                  <br />
                  <span className="inline-flex items-center gap-2">
                    Love <Heart className="w-8 h-8 text-red-400 animate-pulse" />
                  </span>
                </h1>
  <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
    &quot;Hi gita❤️, this website is made for you. I hope your work becomes more efficient.&quot;
  </p>
              </div>

              {/* Upload Area */}
              <Card className="w-full max-w-2xl mx-auto border-2 border-dashed border-pink-200 bg-white/50 backdrop-blur-sm hover:border-pink-300 transition-all duration-300">
                <CardContent className="p-8">
                  <div
                    className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                      dragActive 
                        ? 'border-pink-400 bg-pink-50 scale-105' 
                        : 'border-pink-200 hover:border-pink-300 hover:bg-pink-25'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                        <Upload className="w-10 h-10 text-white" aria-label="Upload Icon" />
                      </div>
                        <h3 className="text-2xl font-bold text-gray-800">
                          Drop your files here! 🎀
                        </h3>
                        <p className="text-gray-600">
                          Or click the button below to browse
                        </p>
                      </div>
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => document.getElementById('file-input')?.click()}
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Choose Files
                      </Button>
                      <input
                        id="file-input"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFiles(e.target.files)}
                      />
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uploading... 🚀</span>
                        <span className="text-pink-500 font-semibold">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Uploaded Successfully! 🎉
                      </h4>
                      {
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                          {fileIcons.document}
                          <span className="flex items-center justify-between  w-full">
                            <p className='text-sm text-gray-700 '>
                              
                              {uploadedFiles[0]}
                              </p> 
                              <X onClick={handleDeleteImage} size={18} className='text-slate-500'/> 
                            
                            </span>
                        </div>

                      }

                    </div>
                  )}
                </CardContent>
                <CardFooter >
                {
                  uploadedFiles.length > 0 && (
                    <Button onClick={handleSubmitFile} className='w-full bg-gradient-to-r from-pink-400 to-purple-500' >Convert to excel</Button>
                  )
                }
                </CardFooter>

              </Card>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>Max 100MB per file</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>All file types supported</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Super fast upload</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}


        {/* Supported File Types */}


        {/* CTA Section */}

      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-pink-100 bg-white/80 backdrop-blur-sm">
        <p className="text-xs text-gray-500">
          © 2024 Isaac-gx. Made with 💕 just for you gita
          !
        </p>

      </footer>
    </div>
  )
}
