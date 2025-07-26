"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  onFileSelect: (file: File | null) => void
  currentFile?: File | null
  label: string
  description?: string
  required?: boolean
}

export function FileUpload({
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5,
  onFileSelect,
  currentFile,
  label,
  description,
  required = false,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          onFileSelect(file)
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeFile = () => {
    onFileSelect(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-slate-500">{description}</p>}

      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver ? "border-slate-400 bg-slate-50" : "border-slate-200",
          currentFile ? "border-green-200 bg-green-50" : "",
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !currentFile && fileInputRef.current?.click()}
      >
        <CardContent className="p-6">
          {isUploading ? (
            <div className="text-center space-y-2">
              <Upload className="h-8 w-8 text-slate-400 mx-auto animate-pulse" />
              <p className="text-sm text-slate-600">Uploading...</p>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          ) : currentFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <File className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{currentFile.name}</p>
                  <p className="text-xs text-slate-500">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Check className="h-3 w-3 mr-1" />
                  Uploaded
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <Upload className="h-8 w-8 text-slate-400 mx-auto" />
              <div>
                <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500">
                  {accept.replace(/\./g, "").toUpperCase()} up to {maxSize}MB
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileInputChange} className="hidden" />
    </div>
  )
}
