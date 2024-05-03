import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { UserUpdatePasswordValidation } from "@/lib/form-validators/user-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const UpdatePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState([false, false, false]);

  const passwordForm: any = useForm({
    resolver: zodResolver(UserUpdatePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof UserUpdatePasswordValidation>
  ) {
    setIsLoading(true);
    if (values.confirmPassword !== values.newPassword) {
      passwordForm.setError("confirmPassword", {
        message: "The passwords did not match with new password",
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
    }, 1000);
  }

  useEffect(() => {
    if (!open) {
      passwordForm.reset();
      setShowPassword([false, false, false]);
      setIsLoading(false);
    }
  }, [open]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {}}
          disabled={isLoading}
          className="w-[200px] mt-4 bg-background gap-2"
          variant={"secondary"}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.lockDot size={16} />
          )}
          Update password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="uppercase flex gap-2">
            <Icons.lockDot size={16} /> Update Password
          </DialogTitle>
          <DialogDescription>Change your password here</DialogDescription>
        </DialogHeader>
        <Form {...passwordForm}>
          <form>
            <div className="grid gap-2 select-none">
              <FormField
                control={passwordForm.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Old Password</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          placeholder="name@example.com"
                          type={showPassword[0] ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          frontIcon={
                            <Icons.lockDot
                              size={16}
                              className="text-muted-foreground"
                            />
                          }
                          backIcon={
                            !showPassword[0] ? (
                              <EyeIcon
                                size={18}
                                className="cursor-pointer"
                                onClick={() =>
                                  setShowPassword((prev) => [
                                    !prev[0],
                                    prev[1],
                                    prev[2],
                                  ])
                                }
                              />
                            ) : (
                              <EyeOffIcon
                                size={18}
                                className="cursor-pointer"
                                onClick={() =>
                                  setShowPassword((prev) => [
                                    !prev[0],
                                    prev[1],
                                    prev[2],
                                  ])
                                }
                              />
                            )
                          }
                          className="flex items-center bg-secondary-background"
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New Password"
                        type={showPassword[1] ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        frontIcon={
                          <Icons.lockDot
                            size={16}
                            className="text-muted-foreground"
                          />
                        }
                        backIcon={
                          !showPassword[1] ? (
                            <EyeIcon
                              size={18}
                              className="cursor-pointer"
                              onClick={() =>
                                setShowPassword((prev) => [
                                  prev[0],
                                  !prev[1],
                                  prev[2],
                                ])
                              }
                            />
                          ) : (
                            <EyeOffIcon
                              size={18}
                              className="cursor-pointer"
                              onClick={() =>
                                setShowPassword((prev) => [
                                  prev[0],
                                  !prev[1],
                                  prev[2],
                                ])
                              }
                            />
                          )
                        }
                        className="flex items-center bg-secondary-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type={showPassword[2] ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        frontIcon={
                          <Icons.lockDot
                            size={16}
                            className="text-muted-foreground"
                          />
                        }
                        backIcon={
                          !showPassword[2] ? (
                            <EyeIcon
                              size={18}
                              className="cursor-pointer"
                              onClick={() =>
                                setShowPassword((prev) => [
                                  prev[0],
                                  prev[1],
                                  !prev[2],
                                ])
                              }
                            />
                          ) : (
                            <EyeOffIcon
                              size={18}
                              className="cursor-pointer"
                              onClick={() =>
                                setShowPassword((prev) => [
                                  prev[0],
                                  prev[1],
                                  !prev[2],
                                ])
                              }
                            />
                          )
                        }
                        className="flex items-center bg-secondary-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={() => {
              onSubmit(passwordForm.getValues());
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePasswordModal;
