import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login, register, resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    resetEmail: '',
    general: ''
  });

  const validateForm = (isRegistering = false, isResetting = false) => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      resetEmail: '',
      general: ''
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isResetting) {
      if (!resetEmail) {
        newErrors.resetEmail = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(resetEmail)) {
        newErrors.resetEmail = 'Please enter a valid email address';
        isValid = false;
      }
      setErrors(newErrors);
      return isValid;
    }

    // Email validation for login/register
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (isRegistering) {
      // Name validation for registration
      if (!name) {
        newErrors.name = 'Name is required';
        isValid = false;
      }

      // Confirm password validation
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Success!",
        description: "You have been successfully logged in.",
      });
      navigate('/home');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrors(prev => ({
        ...prev,
        general: errorMessage
      }));
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(true)) {
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password, name);
      toast({
        title: "Success!",
        description: "Your account has been created and you are now logged in.",
      });
      navigate('/home');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrors(prev => ({
        ...prev,
        general: errorMessage
      }));
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setErrors(prev => ({
        ...prev,
        resetEmail: 'Email is required'
      }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setErrors(prev => ({
        ...prev,
        resetEmail: 'Please enter a valid email address'
      }));
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(resetEmail);
      toast({
        title: "Success!",
        description: "If an account exists with this email, you will receive password reset instructions.",
      });
      setShowResetDialog(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrors(prev => ({
        ...prev,
        resetEmail: errorMessage
      }));
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
           What's next?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your career development companion
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Account Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {errors.general && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: '', general: '' }));
                      }}
                      className={errors.email ? 'border-red-500' : ''}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input 
                      id="login-password" 
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors(prev => ({ ...prev, password: '', general: '' }));
                      }}
                      className={errors.password ? 'border-red-500' : ''}
                      required
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => {
                      setShowResetDialog(true);
                      setResetEmail(email); // Pre-fill with login email if exists
                    }}
                  >
                    Forgot Password?
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/demo')}
                  >
                    Start Demo Tour
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Password Reset Dialog */}
          <Dialog 
            open={showResetDialog} 
            onOpenChange={(open) => {
              setShowResetDialog(open);
              if (!open) {
                setResetEmail('');
                setErrors(prev => ({ ...prev, resetEmail: '', general: '' }));
              }
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email address and we'll send you password reset instructions.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="name@example.com"
                      value={resetEmail}
                      onChange={(e) => {
                        setResetEmail(e.target.value);
                        setErrors(prev => ({ ...prev, resetEmail: '', general: '' }));
                      }}
                      className={errors.resetEmail ? 'border-red-500' : ''}
                      required
                      autoComplete="email"
                    />
                    {errors.resetEmail && (
                      <p className="text-sm text-red-500 mt-1">{errors.resetEmail}</p>
                    )}
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowResetDialog(false);
                      setResetEmail('');
                      setErrors(prev => ({ ...prev, resetEmail: '', general: '' }));
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Instructions"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Register for a new account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  {errors.general && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input 
                      id="register-name" 
                      type="text" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors(prev => ({ ...prev, name: '', general: '' }));
                      }}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: '', general: '' }));
                      }}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors(prev => ({ ...prev, password: '', general: '' }));
                      }}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input 
                      id="register-confirm-password" 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors(prev => ({ ...prev, confirmPassword: '', general: '' }));
                      }}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  {errors.general && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input 
                      id="register-name" 
                      type="text" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors(prev => ({ ...prev, name: '', general: '' }));
                      }}
                      className={errors.name ? 'border-red-500' : ''}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: '', general: '' }));
                      }}
                      className={errors.email ? 'border-red-500' : ''}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password"
                      placeholder="Choose a password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors(prev => ({ ...prev, password: '', general: '' }));
                      }}
                      className={errors.password ? 'border-red-500' : ''}
                      required
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input 
                      id="register-confirm-password" 
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors(prev => ({ ...prev, confirmPassword: '', general: '' }));
                      }}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
