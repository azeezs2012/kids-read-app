import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Story } from "@/lib/types";
import StoryNarrator from '@/app/components/StoryNarrator';
import ClientLink from '@/app/components/ClientLink';

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: story } = await supabase
    .from('stories')
    .select(`
      *,
      level:story_levels (*)
    `)
    .eq('id', id)
    .single();

  if (!story) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex-1 w-full px-8 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-2">
              Level {story.level?.level_number}
            </span>
            <h1 className="text-4xl font-bold text-gray-900">{story.title}</h1>
          </div>
          <ClientLink href={`/story-levels/${story.level_id}`}>
            Back to Level
          </ClientLink>
        </div>

        {story.images.length > 0 && (
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={story.images[0]}
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-8 prose-lg prose-purple">
          <StoryNarrator html={story.story_html} />
        </div>
      </div>
    </div>
  );
} 