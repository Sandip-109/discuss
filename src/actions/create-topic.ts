"use server";

import { auth } from "@/auth";
import { z } from "zod";
import paths from "@/paths";
import { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  _formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const myFormObj = Object.fromEntries(formData.entries());
  const result = createTopicSchema.safeParse(myFormObj);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();

  if (!session || !session?.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
