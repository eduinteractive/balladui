#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

@interface BalladuiViewManager : RCTViewManager
@end

@implementation BalladuiViewManager

RCT_EXPORT_MODULE(BalladuiView)

- (UIView *)view
{
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, NSString)

@end
