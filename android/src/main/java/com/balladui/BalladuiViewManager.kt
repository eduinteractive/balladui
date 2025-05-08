package com.balladui

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.BalladuiViewManagerInterface
import com.facebook.react.viewmanagers.BalladuiViewManagerDelegate

@ReactModule(name = BalladuiViewManager.NAME)
class BalladuiViewManager : SimpleViewManager<BalladuiView>(),
  BalladuiViewManagerInterface<BalladuiView> {
  private val mDelegate: ViewManagerDelegate<BalladuiView>

  init {
    mDelegate = BalladuiViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<BalladuiView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): BalladuiView {
    return BalladuiView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: BalladuiView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "BalladuiView"
  }
}
