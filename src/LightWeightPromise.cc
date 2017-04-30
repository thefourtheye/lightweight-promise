#include <node.h>
#include <v8.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::Value;
using v8::Context;
using v8::Promise;
using v8::Maybe;

void CreatePromise(const FunctionCallbackInfo<Value>& args) {
  Local<Context> context = args.GetIsolate()->GetCurrentContext();
  auto maybe_resolver = Promise::Resolver::New(context);
  if (!maybe_resolver.IsEmpty())
    args.GetReturnValue().Set(maybe_resolver.ToLocalChecked());
}

void ResolvePromise(const FunctionCallbackInfo<Value>& args) {
  Local<Context> context = args.GetIsolate()->GetCurrentContext();
  Local<Value> promise = args[0];
  Local<Promise::Resolver> resolver = promise.As<Promise::Resolver>();
  Maybe<bool> ret = resolver->Resolve(context, args[1]);
  args.GetReturnValue().Set(ret.FromMaybe(false));
}


void RejectPromise(const FunctionCallbackInfo<Value>& args) {
  Local<Context> context = args.GetIsolate()->GetCurrentContext();
  Local<Value> promise = args[0];
  Local<Promise::Resolver> resolver = promise.As<Promise::Resolver>();
  Maybe<bool> ret = resolver->Reject(context, args[1]);
  args.GetReturnValue().Set(ret.FromMaybe(false));
}


void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "createPromise", CreatePromise);
  NODE_SET_METHOD(exports, "resolvePromise", ResolvePromise);
  NODE_SET_METHOD(exports, "rejectPromise", CreatePromise);
}

NODE_MODULE(leanPromise, init)

}
