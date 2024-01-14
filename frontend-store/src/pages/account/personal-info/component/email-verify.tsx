import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { Button } from "../../../../components/ui/button";
import toast from "react-hot-toast";

interface EmailVerifyProps {
  isVerified: boolean;
}

const EmailVerify: React.FC<EmailVerifyProps> = ({ isVerified }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const sendEmailVerification = async () => {
    const response = await fetch("/api/user/verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    });

    const result = await response.json();

    toast.success(result["success"]);
  };

  function onSendVerification() {
    sendEmailVerification();
  }

  return (
    <div className="flex flex-col border-b space-y-4 p-5">
      <div className="inline-flex items-center justify-between tracking-tight">
        <div>
          <div className="font-bold">Email verified</div>
          <div>{isVerified ? "Yes" : "Not yet"}</div>
        </div>
        {isVerified ? (
          <></>
        ) : (
          <Button
            variant="secondary"
            className="font-bold tracking-tight"
            onClick={() => onSendVerification()}
          >
            Send verification
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
