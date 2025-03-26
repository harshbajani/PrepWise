import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id || "",
  });

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
            <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
              <Image
                src={getRandomInterviewCover()}
                alt="cover-image"
                width={40}
                height={40}
                className="rounded-full object-cover size-[40px] shrink-0"
              />
              <h3 className="capitalize truncate">
                {interview.role} Interview
              </h3>
            </div>

            <div className="w-full sm:w-auto">
              <DisplayTechIcons techStack={interview.techstack} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit w-full sm:w-auto text-center">
              {interview.type}
            </p>
            {feedback && (
              <Button className="btn-secondary w-full sm:w-auto" asChild>
                <Link
                  href={`/interview/${id}/feedback`}
                  className="flex justify-center w-full"
                >
                  <p className="text-sm font-semibold text-primary-200 text-center">
                    View Feedback
                  </p>
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Agent
          userName={user?.name || ""}
          userId={user?.id}
          interviewId={id}
          type="interview"
          questions={interview.questions}
          feedbackId={feedback?.id}
        />
      </div>
    </>
  );
};

export default InterviewDetails;
