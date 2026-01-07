import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

// Custom components for MDX
const components: MDXComponents = {
  h1: (props) => (
    <h1 className="mb-6 text-4xl font-bold text-gray-900 font-heading" {...props} />
  ),
  h2: (props) => (
    <h2 className="mb-4 mt-8 text-3xl font-bold text-gray-900 font-heading" {...props} />
  ),
  h3: (props) => (
    <h3 className="mb-3 mt-6 text-2xl font-semibold text-gray-900" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 text-lg leading-relaxed text-gray-700" {...props} />
  ),
  a: (props) => (
    <Link href={props.href || '#'} className="text-primary-600 hover:text-primary-700 underline">
      {props.children}
    </Link>
  ),
  ul: (props) => (
    <ul className="mb-4 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6" {...props} />
  ),
  li: (props) => (
    <li className="text-lg text-gray-700" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-primary-500 bg-primary-50 p-4 italic" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-primary-600" {...props} />
  ),
  pre: (props) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white" {...props} />
  ),
  img: (props) => (
    <Image
      src={props.src || ''}
      alt={props.alt || ''}
      width={800}
      height={400}
      className="my-6 rounded-lg"
    />
  ),
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
